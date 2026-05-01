import { addItem, hasRoomForNewItem } from "../InventorySystems.js";
import { emit } from "../../Core/event.js";
import { items } from "../../data/ItemData.js";
export function rollLootTable(player, lootTable) {
    lootTable.forEach(drop => {
        const roll = Math.random();
        if (roll <= drop.chance) {
            if (hasRoomForNewItem(player, drop.itemId)) {
                const amount = Math.floor(Math.random() * (drop.max - drop.min + 1)) + drop.min;
                addItem(player, drop.itemId, amount);
                emit({
                    type: 'LOOT',
                    message: `Looted ${amount}x ${drop.itemId}!`
                });
            }
            else {
                emit({
                    type: 'SYSTEM',
                    message: `Your inventory is full. The ${items[drop.itemId].name} was destroyed.`
                });
            }
        }
    });
}
export function rollSingleEnemyDrop(player, lootTable) {
    const roll = Math.random();
    let cumulativeChance = 0;
    for (const drop of lootTable) {
        cumulativeChance += drop.chance;
        if (roll <= cumulativeChance) {
            const amount = Math.floor(Math.random() * (drop.max - drop.min + 1)) + 1;
            if (addItem(player, drop.itemId, amount)) {
                emit({
                    type: 'LOOT',
                    message: `${player.userName} received ${items[drop.itemId].name}`
                });
            }
            else {
                emit({
                    type: 'SYSTEM',
                    message: "The enemy dropped something, but your pockets are full!"
                });
            }
            return;
        }
    }
}
//# sourceMappingURL=lootSystems.js.map