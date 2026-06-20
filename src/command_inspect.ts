import { types } from "node:util";
import type { State } from "./state.js";


export async function commandInspect(state: State, ...args: string[]) {
    const name = args[0]
    const pokemon = state.caughtPokemon[name]
    if (pokemon) {
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);
        console.log("Stats:");
        for (const stat of pokemon.stats) {
            console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
        };
        console.log("Types:");
        for (const type of pokemon.types) {
            console.log(`  -${type.type.name}`);
        };
    } else {
        console.log("you have not caught that pokemon");
    }
} 