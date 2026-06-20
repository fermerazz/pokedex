import type { State } from "./state.js";

export async function commandCatch(state: State, pokemon: string): Promise<void> {
    console.log(`Throwing a Pokeball at ${pokemon}...`);
    const resp = await state.pokeAPI.fetchPokemon(pokemon);
    const roll = Math.floor(Math.random() * resp.base_experience);
    if (roll <=  50) {
        state.caughtPokemon[resp.name] = resp;
        console.log(`${pokemon} was caught!`);
    } else {
        console.log(`${pokemon} escaped!`);
    }
}