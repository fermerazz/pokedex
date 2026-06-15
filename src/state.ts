import { readdir, readlink } from "fs";
import { createInterface, type Interface } from "readline";
import { Readline } from "readline/promises";
import { getCommands } from "./commands";

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
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
    };
};