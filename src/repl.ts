import { createInterface } from "readline";
import { getCommands } from "./commands";

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
        
        const commandName = clean[0]
        const commands = getCommands();
        const cmd = commands[commandName];
        if (!cmd) {
        console.log(
            `Unknown command: "${commandName}". Type "help" for a list of commands.`,
        );
        rl.prompt();
        return;
        }

        try {
        cmd.callback(commands);
        } catch (e) {
        console.log(e);
        }

        rl.prompt();
        });
}