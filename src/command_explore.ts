import { State } from "./state";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const location = args[0];
    const resp = await state.pokeAPI.fetchLocation(location);
    console.log(`Exploring ${location}...`);
    console.log("Found Pokemon:");
    for (const pokemon of resp.pokemon_encounters) {
        console.log(` - ${pokemon.pokemon.name}`);
    };
};
