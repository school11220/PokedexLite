"use client";

import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { FAVORITES_STORAGE_KEY } from "@/lib/constants";
import { readStorageArray, writeStorageArray } from "@/lib/localStorage";

const FAVORITES_UPDATED_EVENT = "pokedex-lite:favorites-updated";
const EMPTY_FAVORITES: string[] = [];
let cachedFavoritesRaw: string | null = null;
let cachedFavoritesSnapshot: string[] = EMPTY_FAVORITES;

function subscribeToFavorites(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", callback);
  window.addEventListener(FAVORITES_UPDATED_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(FAVORITES_UPDATED_EVENT, callback);
  };
}

function getFavoritesSnapshot() {
  if (typeof window === "undefined") {
    return EMPTY_FAVORITES;
  }

  const rawValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (rawValue === cachedFavoritesRaw) {
    return cachedFavoritesSnapshot;
  }

  cachedFavoritesRaw = rawValue;
  cachedFavoritesSnapshot = readStorageArray(FAVORITES_STORAGE_KEY);
  return cachedFavoritesSnapshot;
}

function getServerFavoritesSnapshot() {
  return EMPTY_FAVORITES;
}

export function useFavorites() {
  const { user, isSignedIn } = useUser();
  const favorites = useSyncExternalStore(
    subscribeToFavorites,
    getFavoritesSnapshot,
    getServerFavoritesSnapshot
  );

  useEffect(() => {
    if (!isSignedIn || !user) {
      return;
    }

    const metadataFavorites = user.publicMetadata?.favorites;
    if (!Array.isArray(metadataFavorites)) {
      return;
    }

    const normalized = metadataFavorites
      .filter((item): item is string => typeof item === "string")
      .sort();

    if (normalized.length === 0) {
      return;
    }

    const localFavorites = readStorageArray(FAVORITES_STORAGE_KEY);
    if (localFavorites.length === 0) {
      writeStorageArray(FAVORITES_STORAGE_KEY, normalized);
      window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
    }
  }, [isSignedIn, user]);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const isFavorite = useCallback(
    (name: string) => favoriteSet.has(name),
    [favoriteSet]
  );

  const toggleFavorite = useCallback((name: string) => {
    const currentFavorites = readStorageArray(FAVORITES_STORAGE_KEY);
    const nextFavorites = currentFavorites.includes(name)
      ? currentFavorites.filter((item) => item !== name)
      : [...currentFavorites, name].sort();

    writeStorageArray(FAVORITES_STORAGE_KEY, nextFavorites);
    window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));

    if (isSignedIn && user) {
      void user.update({
        publicMetadata: {
          ...user.publicMetadata,
          favorites: nextFavorites
        }
      });
    }
  }, [isSignedIn, user]);

  return {
    favorites,
    hydrated: true,
    isFavorite,
    toggleFavorite
  };
}
