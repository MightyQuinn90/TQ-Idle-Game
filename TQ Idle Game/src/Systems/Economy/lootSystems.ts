import type { Player } from "../../types/types.js";
import { addItem, hasRoomForNewItem } from "../InventorySystems.js";
import { emit } from "../../Core/event.js";
import type { LootDrop } from "../../types/combat.js";
import { items } from "../../data/ItemData.js";

export function rollLootTable(player: Player, lootTable: LootDrop[]) {
    lootTable.forEach(drop => {
        const roll = Math.random()

        if (roll <= drop.chance) {
            if(hasRoomForNewItem(player, drop.itemId)){
            const amount = Math.floor(Math.random() * (drop.max - drop.min + 1)) + drop.min
            addItem(player, drop.itemId, amount)
                emit({
                    type: 'LOOT',
                    message: `Looted ${amount}x ${drop.itemId}!`
                })
            } else {
                emit({
                    type: 'SYSTEM', 
                    message: `Your inventory is full. The ${items[drop.itemId].name} was destroyed.`
                })
            }
        }
    });
}
export function rollSingleEnemyDrop(player: Player, lootTable: LootDrop[]){
    const roll = Math.random()
    let cumulativeChance = 0

    for (const drop of lootTable){
        cumulativeChance += drop.chance

        if(roll <= cumulativeChance){
            const amount = Math.floor(Math.random() * (drop.max - drop.min + 1)) + 1

            if(addItem(player, drop.itemId, amount)){
                emit({
                    type: 'LOOT',
                    message: `${player.userName} received ${items[drop.itemId].name}`
                })
            } else {
                emit({
                    type: 'SYSTEM',
                    message: "The enemy dropped something, but your pockets are full!"
                });
            } 
            return
        }
    }
}
