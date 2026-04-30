"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import {
  getAllPokemonSummaries,
  getPokemonByType,
  getPokemonDetailsForSummaries,
  getPokemonPage,
  getPokemonTypes
} from "@/lib/api";
import type { PokemonDetail, PokemonSummary, UsePokemonsOptions } from "@/lib/types";
import { useDebounce } from "@/hooks/useDebounce";

type LoadState = {
  pokemon: PokemonDetail[];
  totalCount: number;
};

function filterByName(items: PokemonSummary[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return items;
  }

  return items.filter((pokemon) => pokemon.name.toLowerCase().includes(normalizedQuery));
}

function paginate<T>(items: T[], page: number, pageSize: number) {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}

function getSafePage(totalCount: number, pageSize: number, requestedPage: number) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  return Math.min(Math.max(requestedPage, 1), totalPages);
}

export function usePokemons({ favoriteNames }: UsePokemonsOptions) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);
  const [selectedType, setSelectedType] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [types, setTypes] = useState<string[]>([]);
  const [loadState, setLoadState] = useState<LoadState>({ pokemon: [], totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const favoriteKey = useMemo(() => favoriteNames.join("|"), [favoriteNames]);

  useEffect(() => {
    let ignore = false;

    getPokemonTypes()
      .then((typeNames) => {
        if (!ignore) {
          setTypes(typeNames);
        }
      })
      .catch(() => {
        if (!ignore) {
          setTypes([]);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadPokemon() {
      setLoading(true);
      setError(null);

      try {
        const shouldUseClientList = Boolean(
          debouncedQuery.trim() || selectedType || showFavoritesOnly
        );

        let totalCount = 0;
        let summaries: PokemonSummary[] = [];

        if (showFavoritesOnly) {
          const allPokemon = await getAllPokemonSummaries();
          const favoriteSet = new Set(favoriteNames);
          const favoriteSummaries = allPokemon.filter((pokemon) => favoriteSet.has(pokemon.name));

          if (selectedType) {
            const typedPokemon = await getPokemonByType(selectedType);
            const typedSet = new Set(typedPokemon.map((pokemon) => pokemon.name));
            summaries = filterByName(
              favoriteSummaries.filter((pokemon) => typedSet.has(pokemon.name)),
              debouncedQuery
            );
          } else {
            summaries = filterByName(favoriteSummaries, debouncedQuery);
          }

          totalCount = summaries.length;
          summaries = paginate(summaries, getSafePage(totalCount, pageSize, page), pageSize);
        } else if (shouldUseClientList) {
          const baseSummaries = selectedType
            ? await getPokemonByType(selectedType)
            : await getAllPokemonSummaries();
          const filteredSummaries = filterByName(baseSummaries, debouncedQuery);

          totalCount = filteredSummaries.length;
          summaries = paginate(
            filteredSummaries,
            getSafePage(totalCount, pageSize, page),
            pageSize
          );
        } else {
          const result = await getPokemonPage(pageSize, (page - 1) * pageSize);
          totalCount = result.count;
          summaries = result.results;
        }

        const details = await getPokemonDetailsForSummaries(summaries);

        if (!ignore) {
          setLoadState({
            pokemon: details,
            totalCount
          });
        }
      } catch (caughtError) {
        if (!ignore) {
          const message =
            caughtError instanceof Error
              ? caughtError.message
              : "Something went wrong while loading Pokémon.";
          setError(message);
          setLoadState({ pokemon: [], totalCount: 0 });
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      ignore = true;
    };
  }, [
    debouncedQuery,
    favoriteKey,
    favoriteNames,
    page,
    pageSize,
    reloadKey,
    selectedType,
    showFavoritesOnly
  ]);

  const totalPages = Math.max(1, Math.ceil(loadState.totalCount / pageSize));
  const currentPage = getSafePage(loadState.totalCount, pageSize, page);

  const retry = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  const updateQuery = useCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, []);

  const updateSelectedType = useCallback((value: string) => {
    setSelectedType(value);
    setPage(1);
  }, []);

  const updatePageSize = useCallback((value: number) => {
    setPageSize(value);
    setPage(1);
  }, []);

  const updateShowFavoritesOnly = useCallback((value: boolean | ((current: boolean) => boolean)) => {
    setShowFavoritesOnly(value);
    setPage(1);
  }, []);

  return {
    pokemon: loadState.pokemon,
    types,
    query,
    selectedType,
    page: currentPage,
    pageSize,
    totalPages,
    totalCount: loadState.totalCount,
    loading,
    error,
    isSearching: query !== debouncedQuery,
    showFavoritesOnly,
    setQuery: updateQuery,
    setSelectedType: updateSelectedType,
    setPage,
    setPageSize: updatePageSize,
    setShowFavoritesOnly: updateShowFavoritesOnly,
    retry
  };
}
