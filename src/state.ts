import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands";
import { PokeAPI } from "./pokeapi";

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI; 
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    return {
        readline: rl,
        commands: getCommands(),
        pokeAPI: new PokeAPI(300000),
        nextLocationsURL: null,
        prevLocationsURL: null,
    };
};