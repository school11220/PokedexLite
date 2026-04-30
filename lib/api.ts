import { OFFICIAL_TYPE_ORDER, POKEAPI_BASE_URL } from "@/lib/constants";
import type {
  NamedApiResource,
  PokemonDetail,
  PokemonDetailResponse,
  PokemonListResponse,
  PokemonSummary,
  PokemonTypeDetailResponse,
  PokemonTypeListResponse
} from "@/lib/types";
import { formatPokemonName } from "@/lib/utils";

const detailCache = new Map<string, Promise<PokemonDetail>>();
let allPokemonCache: Promise<PokemonSummary[]> | null = null;
let typeListCache: Promise<string[]> | null = null;
const pokemonByTypeCache = new Map<string, Promise<PokemonSummary[]>>();

class PokeApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PokeApiError";
  }
}

async function request<T>(pathOrUrl: string, init?: RequestInit): Promise<T> {
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : `${POKEAPI_BASE_URL}${pathOrUrl}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        ...init?.headers
      }
    });
  } catch {
    throw new PokeApiError("Unable to reach PokéAPI. Please check your connection and try again.");
  }

  if (!response.ok) {
    throw new PokeApiError(`PokéAPI returned ${response.status}. Please try again in a moment.`);
  }

  return response.json() as Promise<T>;
}

function extractPokemonId(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
}

function toSummary(resource: NamedApiResource): PokemonSummary {
  return {
    ...resource,
    id: extractPokemonId(resource.url)
  };
}

function normalizePokemonDetail(detail: PokemonDetailResponse): PokemonDetail {
  const artwork = detail.sprites.other?.["official-artwork"]?.front_default ?? null;
  const homeSprite = detail.sprites.other?.home?.front_default ?? null;
  const sprite = detail.sprites.front_default ?? null;
  const shinyArtwork = detail.sprites.other?.["official-artwork"]?.front_shiny ?? null;
  const shinyHomeSprite = detail.sprites.other?.home?.front_shiny ?? null;
  const shinySprite = detail.sprites.front_shiny ?? null;
  return {
    id: detail.id,
    name: detail.name,
    image: artwork ?? homeSprite ?? sprite,
    artwork,
    sprite,
    shinyArtwork: shinyArtwork ?? shinyHomeSprite ?? shinySprite,
    shinySprite,
    cries: detail.cries ?? null,
    height: detail.height,
    weight: detail.weight,
    types: detail.types
      .map((item) => ({
        name: item.type.name,
        slot: item.slot
      }))
      .sort((left, right) => left.slot - right.slot),
    abilities: detail.abilities.map((item) => ({
      name: formatPokemonName(item.ability.name),
      isHidden: item.is_hidden
    })),
    stats: detail.stats.map((item) => ({
      name: formatPokemonName(item.stat.name),
      value: item.base_stat
    }))
  };
}

export async function getPokemonPage(limit: number, offset: number): Promise<{
  count: number;
  results: PokemonSummary[];
}> {
  const data = await request<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);

  return {
    count: data.count,
    results: data.results.map(toSummary)
  };
}

export function getAllPokemonSummaries(): Promise<PokemonSummary[]> {
  if (!allPokemonCache) {
    allPokemonCache = request<PokemonListResponse>("/pokemon?limit=2000&offset=0").then((data) =>
      data.results.map(toSummary)
    );
  }

  return allPokemonCache;
}

export function getPokemonTypes(): Promise<string[]> {
  if (!typeListCache) {
    typeListCache = request<PokemonTypeListResponse>("/type").then((data) => {
      const typeNames = new Set(data.results.map((type) => type.name));
      return OFFICIAL_TYPE_ORDER.filter((type) => typeNames.has(type));
    });
  }

  return typeListCache;
}

export function getPokemonByType(typeName: string): Promise<PokemonSummary[]> {
  const normalizedType = typeName.toLowerCase();

  if (!pokemonByTypeCache.has(normalizedType)) {
    pokemonByTypeCache.set(
      normalizedType,
      request<PokemonTypeDetailResponse>(`/type/${normalizedType}`).then((data) =>
        data.pokemon.map((item) => toSummary(item.pokemon)).sort((left, right) => left.id - right.id)
      )
    );
  }

  return pokemonByTypeCache.get(normalizedType)!;
}

export function getPokemonDetail(nameOrId: string | number): Promise<PokemonDetail> {
  const key = String(nameOrId).toLowerCase();

  if (!detailCache.has(key)) {
    detailCache.set(
      key,
      request<PokemonDetailResponse>(`/pokemon/${key}`).then(normalizePokemonDetail)
    );
  }

  return detailCache.get(key)!;
}

export async function getPokemonDetailsForSummaries(
  summaries: PokemonSummary[]
): Promise<PokemonDetail[]> {
  return Promise.all(summaries.map((summary) => getPokemonDetail(summary.name)));
}

export function clearPokemonDetailCache() {
  detailCache.clear();
}
