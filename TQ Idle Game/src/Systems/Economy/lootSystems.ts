import type { Player } from "../../types/types.js";
import { addItem } from "../InventorySystems.js";
import { emit } from "../../Core/event.js";
import type { LootDrop } from "../../types/combat.js";

export function rollLootTable(player: Player, lootTable: LootDrop[]) {
    lootTable.forEach(drop => {
        const roll = Math.random(); // Generates 0.0 to 1.0

        if (roll <= drop.chance) {
            const amount = Math.floor(Math.random() * (drop.max - drop.min + 1)) + drop.min;
            
            if (amount > 0) {
                addItem(player, drop.itemId, amount);
                
                emit({
                    type: 'LOOT',
                    message: `Looted ${amount}x ${drop.itemId}!`
                });
            }
        }
    });
}

