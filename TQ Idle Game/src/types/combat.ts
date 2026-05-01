import type { ItemId } from "./types.js"



export type CombatStats = {
    hp: number
    maxHp: number
    attack: number
    defense: number
    speed: number
}
export type MonsterId = 'slime' | 'goblin' | 'forest-spider'
export type Monster = {
    id: MonsterId
    name: string
    level: number
    stats: CombatStats
    lootTable: LootDrop[]
    xpValue: number
}
export type LootDrop = {
    itemId: ItemId
    chance: number
    min: number
    max: number
}
export type CombatState = {
    isInCombat: boolean
    targetMonster: Monster | null
    turnNumber: number
    combatLog: string[]
    combatInterval?: any
}