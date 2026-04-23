import type { ItemId } from "./types.js"



export type LootDrop = {
    itemId: ItemId
    chance: number
    min: number
    max: number
}