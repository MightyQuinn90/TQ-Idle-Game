import type { Player } from "../types/types.js"
import { emit } from "../Core/event.js"

export function addItem(player: Player, itemId: string, amount: number = 1){
    const existing = player.inventory.find(i => i.itemId === itemId)

    if(existing){
        existing.quantity += amount
    } else {
        player.inventory.push({
            itemId, quantity: amount
        })
    }
    emit({type: "ITEM_GAIN", itemId, amount})
}
export function removeItem(player: Player, itemId: string, amount: number){
    const entry = player.inventory.find(i => i.itemId === itemId)
    if(!entry) return 

    entry.quantity -= amount
    if(entry.quantity <= 0){
        player.inventory = player.inventory.filter(i => i.itemId !== itemId)
    }

}
