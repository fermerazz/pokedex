import { State } from "./state";

export function cleanInput(input: string): string[] {
    const lowercaseInput = input.toLowerCase().trim();
    const words = lowercaseInput.split(" ");
    return words.filter(word => word !== "");
}
export function startREPL(state: State) {
    
    state.readline.prompt();
    state.readline.on('line', async (input) => {
        const clean = cleanInput(input);
        if (clean.length === 0) {
            state.readline.prompt()
            return;
        }
        
        const commandName = clean[0]
        const cmd = state.commands[commandName];
        if (!cmd) {
        console.log(
            `Unknown command: "${commandName}". Type "help" for a list of commands.`,
        );
        state.readline.prompt();
        return;
        }

        try {
        await cmd.callback(state);
        } catch (e) {
        console.log((e as Error).message);
        }

        state.readline.prompt();
        });
}