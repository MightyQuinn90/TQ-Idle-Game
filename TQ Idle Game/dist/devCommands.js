import { startGameLoop, stopGameLoop, runManualTick } from "./Core/gameLoop.js";
import { mainPlayer } from "./types/Player.js";
import { gameTick } from "./Systems/idleSystems.js";
import { gameState } from "./Core/gameState.js";
import { saveGame, loadGame } from "./Core/save.js";
export function handleCommand(input) {
    const cmd = input.trim().toLowerCase();
    switch (cmd) {
        case "auto":
            gameState.mode = "AUTO";
            startGameLoop(mainPlayer, 1000);
            console.log("Mode: AUTO");
            break;
        case "manual":
            gameState.mode = "MANUAL";
            stopGameLoop();
            console.log("Mode: MANUAL");
            break;
        case "tick":
            runManualTick(mainPlayer);
            break;
        case "start":
            gameState.mode = "AUTO";
            startGameLoop(mainPlayer, 1000);
            break;
        case "stop":
            stopGameLoop();
            break;
        case "inv":
            console.log(mainPlayer.inventory);
            break;
        case "stats":
            console.log(mainPlayer.skills);
            break;
        case "save":
            saveGame(mainPlayer);
            break;
        case "load":
            const loaded = loadGame();
            if (!loaded) {
                console.log('No save file found.');
                break;
            }
            Object.assign(mainPlayer, loaded);
            console.log('Game loaded!');
            break;
        default:
            console.log("Commands: auto | manual | tick | start | stop | inv | stats");
    }
}
//# sourceMappingURL=devCommands.js.map