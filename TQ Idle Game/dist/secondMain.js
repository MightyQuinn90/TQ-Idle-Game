import readline from "readline";
import { mainPlayer } from "./Player.js";
import { initLogger } from "./logger.js";
import { handleCommand } from "./devCommands.js";
// init systems
initLogger();
console.log("=== Idle Dev Box ===");
console.log("Type: manual | auto | tick | inv | stats");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on("line", (input) => {
    handleCommand(input);
});
//# sourceMappingURL=secondMain.js.map