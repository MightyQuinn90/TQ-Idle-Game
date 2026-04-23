import type { CombatState, Monster } from "../types/combat.js"

export type GameMode = "MANUAL" | "AUTO"

export const gameState = {
    mode: "MANUAL" as GameMode,
    activeEnemies: [] as Monster[],
    combat: {
        isInCombat: false, 
        targetMonster: null, 
        turnNumber: 0,
        combatLog: []
    } as CombatState

}