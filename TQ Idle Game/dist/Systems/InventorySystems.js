import { emit } from "../Core/event.js";
import { items } from "../data/ItemData.js";
import { rollLootTable } from "./Economy/lootSystems.js";
import { lootTables } from "../data/lootTables.js";
export function addItem(player, itemId, amount = 1) {
    const existing = player.inventory.find(i => i.itemId === itemId);
    if (!existing && player.inventory.length >= player.maxSlots) {
        return false;
    }
    if (existing) {
        existing.quantity += amount;
    }
    else {
        player.inventory.push({
            itemId, quantity: amount
        });
    }
    emit({ type: "ITEM_GAIN", itemId, amount });
    return true;
}
export function removeItem(player, itemId, amount) {
    const entry = player.inventory.find(i => i.itemId === itemId);
    if (!entry)
        return;
    entry.quantity -= amount;
    if (entry.quantity <= 0) {
        player.inventory = player.inventory.filter(i => i.itemId !== itemId);
    }
    //will switch two .splice() at some point as .filter() gives a new array.//
}
export function openChest(player, chestId) {
    const item = items[chestId];
    if (!item || item.type !== 'chest' || !item.lootTableId) {
        return;
    }
    const inventoryItem = player.inventory.find(i => i.itemId === chestId);
    if (!inventoryItem || inventoryItem.quantity <= 0) {
        emit({ type: 'SYSTEM', message: `You don't have any ${item.name}s to open.` });
        return;
    }
    const actualLootArray = lootTables[item.lootTableId];
    if (!actualLootArray) {
        console.error(`Loot table ${item.lootTableId} is missing from LootData.ts`);
        return;
    }
    removeItem(player, chestId, 1);
    rollLootTable(player, actualLootArray);
    emit({
        type: 'ACTION',
        message: `You opened a ${item.name}.`
    });
}
export function isInventorySlotsFull(player, itemIdToAdd) {
    const hasItem = player.inventory.some(i => i.itemId === itemIdToAdd);
    if (hasItem)
        return false;
    return player.inventory.length >= player.maxSlots;
}
export function hasRoomForNewItem(player, itemId) {
    const existingItem = player.inventory.find(i => i.itemId === itemId);
    if (existingItem)
        return true;
    return player.inventory.length < player.maxSlots;
}
//# sourceMappingURL=InventorySystems.js.map