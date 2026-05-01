import readline from "readline";
import { initLogger } from "./Core/logger.js";
import { handleCommand } from "./devCommands.js";
import { loadGame } from "./Core/save.js";
import { mainPlayer } from "./types/Player.js";
// init systems
initLogger();
// const loaded = loadGame()
// if (loaded){
//     Object.assign(mainPlayer, loaded)
//     console.log(`Game Loaded`)
//     console.log(`Welcome back, ${mainPlayer.userName}`)
// } else {
//     console.log('New game started.')
// }
console.log("=== Idle Main Dev Testing ===");
console.log("Type: manual | auto | tick | inv | stats");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on("line", (input) => {
    handleCommand(input);
});
//# sourceMappingURL=main.js.map