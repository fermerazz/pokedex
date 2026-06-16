import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache:  Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    const cached = this.cache.get(url);
    if (cached) {
        return cached;
    };
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`status: ${response.status}`)
    };
    const data: ShallowLocations = await response.json();
    this.cache.add(url, data);
    return data;
  };

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.cache.get(url);
    if (cached) {
        return cached;
    };
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`status: ${response.status}`);
    };
    const location: Location = await response.json();
    this.cache.add(url, location);
    return location;
  };
};

export type ShallowLocations = {
  results: {
    name: string,
    url: string,
  } [],
  next: string | null,
  previous: string | null,
};


export interface Location {
  encounter_method_rates: EncounterMethodRate[]
  game_index: number
  id: number
  location: NamedAPIResource
  name: string
  names: Name[]
  pokemon_encounters: PokemonEncounter[]
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
}

export interface EncounterMethod {
  name: string
  url: string
}

export interface VersionDetail {
  rate: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface NamedAPIResource {
  name: string
  url: string
}

export interface Name {
  language: Language
  name: string
}

export interface Language {
  name: string
  url: string
}

export interface PokemonEncounter {
  pokemon: Pokemon
  version_details: VersionDetail2[]
}

export interface Pokemon {
  name: string
  url: string
}

export interface VersionDetail2 {
  encounter_details: EncounterDetail[]
  max_chance: number
  version: Version2
}

export interface EncounterDetail {
  chance: number
  condition_values: any[]
  max_level: number
  method: Method
  min_level: number
}

export interface Method {
  name: string
  url: string
}

export interface Version2 {
  name: string
  url: string
};

