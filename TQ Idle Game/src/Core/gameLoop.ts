import type { Player } from "../types/types.js"
import { gameTick } from "../Systems/idleSystems.js"
import { emit } from "./event.js"
import { mainPlayer } from "../types/Player.js"
import { gameState } from "./gameState.js"
import { startTick, endTick } from "./tickBuffer.js"
import { processCombatTicks } from "../Systems/Combat/combatSystems.js"


let tickCount = 0
let interval: NodeJS.Timeout | null = null

export function startGameLoop(player: Player, tickSpeedMs = 1000) {
    if (interval) return

    interval = setInterval(() => {
        if (gameState.mode !== 'AUTO') return

        tickCount++

        startTick()

        if(gameState.combat.isInCombat){
            processCombatTicks(player, gameState.combat)
        } else{
            gameTick(player)
        }
        endTick(tickCount)
        
    }, tickSpeedMs)
}

export function runManualTick(player: Player){
    tickCount++

    startTick()

    emit({
        type: 'SYSTEM', 
        message: `Calculating...`
    })

    gameTick(player)

    endTick(tickCount)
}



export function stopGameLoop() {
    if (!interval) return
    clearInterval(interval)
    interval = null
}

startGameLoop(mainPlayer, 250)