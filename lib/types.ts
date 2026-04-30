export type NamedApiResource = {
  name: string;
  url: string;
};

export type PokemonSummary = NamedApiResource & {
  id: number;
};

export type PokemonType = {
  name: string;
  slot: number;
};

export type PokemonStat = {
  name: string;
  value: number;
};

export type PokemonAbility = {
  name: string;
  isHidden: boolean;
};

export type PokemonDetail = {
  id: number;
  name: string;
  image: string | null;
  artwork: string | null;
  sprite: string | null;
  shinyArtwork: string | null;
  shinySprite: string | null;
  cries: {
    latest: string;
    legacy: string;
  } | null;
  types: PokemonType[];
  abilities: PokemonAbility[];
  height: number;
  weight: number;
  stats: PokemonStat[];
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
};

export type PokemonTypeListResponse = {
  results: NamedApiResource[];
};

export type PokemonTypeDetailResponse = {
  pokemon: Array<{
    pokemon: NamedApiResource;
    slot: number;
  }>;
};

export type PokemonDetailResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  cries?: {
    latest: string;
    legacy: string;
  };
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
        front_shiny: string | null;
      };
      home?: {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
  types: Array<{
    slot: number;
    type: NamedApiResource;
  }>;
  abilities: Array<{
    is_hidden: boolean;
    ability: NamedApiResource;
  }>;
  stats: Array<{
    base_stat: number;
    stat: NamedApiResource;
  }>;
};

export type PokemonFilters = {
  query: string;
  selectedType: string;
  page: number;
  pageSize: number;
  showFavoritesOnly: boolean;
};

export type UsePokemonsOptions = {
  favoriteNames: string[];
};
