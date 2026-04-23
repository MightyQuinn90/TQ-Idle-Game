import { onEvent } from "./event.js"
import { logTick } from "./tickBuffer.js"

export function log(msg: string){
    console.log(`[GAME] ${msg}`)
}
export function logGain(msg: string){
    console.log(`+ ${msg}`)
}
export function logSystem(msg: string){
    console.log(`[SYSTEM] ${msg}`)
}

export function initLogger() {
    onEvent((event) => {
        switch (event.type) {

            case "ACTION":
                logTick(event.message)
                break

            case "ITEM_GAIN":
                logTick(`+${event.amount} ${event.itemId}`)
                break

            case "XP_GAIN":
                logTick(`+${event.amount} XP (${event.skillId})`)
                break

            case "LEVEL_UP":
                logTick(`${event.skillId} leveled up! (${event.oldLevel} → ${event.newLevel})`)
                break

            case "SYSTEM":
                break
        }
    })
}