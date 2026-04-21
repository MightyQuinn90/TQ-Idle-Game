import readline from "readline";
import { handleCommand } from "./devCommands.js";
import { initLogger } from "./logger.js";
initLogger();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("Dev box ready. Commands: start | stop | tick | inv | stats");
rl.on("line", (input) => {
    handleCommand(input);
});
//# sourceMappingURL=mainUserTest.js.map