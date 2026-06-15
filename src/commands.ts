import { commandExit } from "./command_exit.js"
import { commandHelp } from "./command_help.js"
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map : {
      name: "map",
      description: "Displays the map (20 entries)",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displayed the last 20 entries",
      callback: commandMapb,
    }
  };
}