import { State } from "./state";

export function cleanInput(input: string): string[] {
    const lowercaseInput = input.toLowerCase().trim();
    const words = lowercaseInput.split(" ");
    return words.filter(word => word !== "");
}
export function startREPL(state: State) {
    
    state.readline.prompt();
    state.readline.on('line', async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.readline.prompt()
            return;
        }
        
        const commandName = words[0];
        const args = words.slice(1);
        const cmd = state.commands[commandName];
        if (!cmd) {
        console.log(
            `Unknown command: "${commandName}". Type "help" for a list of commands.`,
        );
        state.readline.prompt();
        return;
        }

        try {
        await cmd.callback(state, ...args);
        } catch (e) {
        console.log((e as Error).message);
        }

        state.readline.prompt();
        });
}