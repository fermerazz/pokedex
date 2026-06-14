import { createInterface } from "readline";

export function cleanInput(input: string): string[] {
    const lowercaseInput = input.toLowerCase().trim();
    const words = lowercaseInput.split(" ");
    return words.filter(word => word !== "");
}
export function startREPL() {
    const rl = createInterface( {
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    rl.prompt();
    rl.on('line', (input) => {
        const clean = cleanInput(input);
        if (clean.length === 0) {
            rl.prompt()
            return;
        }
        console.log(`Your command was: ${clean[0]}`);
        rl.prompt();
    });
}