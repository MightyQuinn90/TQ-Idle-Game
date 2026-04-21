import { startGameLoop, stopGameLoop, runManualTick } from "./gameLoop.js"
import { mainPlayer } from "./Player.js"
import { gameTick } from "./idleSystems.js"
import { gameState } from "./gameState.js"
import { saveGame, loadGame } from "./save.js"

export function handleCommand(input: string) {
    const cmd = input.trim().toLowerCase()

    switch (cmd) {
        case "auto":
            gameState.mode = "AUTO"
            startGameLoop(mainPlayer, 1000)
            console.log("Mode: AUTO")
            break

        case "manual":
            gameState.mode = "MANUAL"
            stopGameLoop()
            console.log("Mode: MANUAL")
            break

        case "tick":
            runManualTick(mainPlayer)
            break

        case "start":
            gameState.mode = "AUTO"
            startGameLoop(mainPlayer, 1000)
            break

        case "stop":
            stopGameLoop()
            break

        case "inv":
            console.log(mainPlayer.inventory)
            break

        case "stats":
            console.log(mainPlayer.skills)
            break
        
        case "save": 
            saveGame(mainPlayer)
            break

        case "load": 
            const loaded = loadGame()
            if(!loaded){
                console.log('No save file found.')
                break
            }
            
            Object.assign(mainPlayer, loaded)
            console.log('Game loaded!')
            break

        default:
            console.log("Commands: auto | manual | tick | start | stop | inv | stats")
    }
}