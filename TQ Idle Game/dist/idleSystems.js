import { items, gatherSources, craftingRecipes } from "./ItemData.js";
import { logGain, logSystem, log, initLogger } from "./logger.js";
import { emit } from "./event.js";
const skillTicks = {
    woodcutting: tickWoodcutting,
    mining: tickMining,
    fishing: tickFishing,
    crafting: tickCrafting,
};
function getRandomItem(array) {
    if (array.length === 0) {
        throw new Error("Array Empty");
    }
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}
export function gameTick(player) {
    const activity = player.currentActivity;
    if (!activity)
        return;
    const handler = skillTicks[activity];
    if (!handler)
        return;
    handler(player);
}
export function tickWoodcutting(player) {
    const logs = gatherSources.woodcutting
        .filter(log => canUseItem(log, player.skills.woodcutting.level))
        .map((id) => ({ id, item: items[id] }));
    if (logs.length === 0) {
        emit({
            type: 'ACTION',
            message: "Your woodcuting is not high enough to do this."
        });
        return;
    }
    const randomLog = getRandomItem(logs);
    if (!randomLog)
        return;
    addItem(player, randomLog.id, 1);
    addXp(player.skills.woodcutting, randomLog.item.xp);
    emit({
        type: 'ACTION',
        message: `You chop a ${randomLog.item.name}`
    });
}
export function tickMining(player) {
    const ore = gatherSources.mining
        .filter(ore => canUseItem(ore, player.skills.mining.level))
        .map((id) => ({ id, item: items[id] }));
    if (ore.length === 0) {
        emit({
            type: "ACTION",
            message: "Your mining is not high enough to do this."
        });
        return;
    }
    const randomOre = getRandomItem(ore);
    if (!randomOre)
        return;
    addItem(player, randomOre.id, 1);
    addXp(player.skills.mining, randomOre.item.xp);
    emit({
        type: 'ACTION',
        message: `You mine a piece of ${randomOre.item.name}.`
    });
}
export function tickFishing(player) {
    const playerFishingLevel = player.skills.fishing;
    const fish = gatherSources.fishing
        .filter(fish => canUseItem(fish, player.skills.fishing.level))
        .map((id) => ({ id, item: items[id] }));
    if (fish.length === 0) {
        emit({
            type: 'ACTION',
            message: 'Your fishing is not high enough.'
        });
        return;
    }
    const randomFish = getRandomItem(fish);
    if (!randomFish)
        return;
    addItem(player, randomFish.id, 1);
    addXp(playerFishingLevel, randomFish.item.xp);
}
export function tickCrafting(player) { }
export function canUseItem(logId, level) {
    const item = items[logId];
    return level >= (item.levelReq ?? 0);
}
export function getItemCount(player, itemId) {
    return player.inventory.find(i => i.itemId === itemId)?.quantity ?? 0;
}
export function canCraft(player, recipe) {
    for (const [id, need] of Object.entries(recipe.input)) {
        const have = getItemCount(player, id);
        if (have < need)
            return false;
    }
    return true;
}
export function craftRecipe(player, recipe, times = 1) {
    for (const [id, need] of Object.entries(recipe.input)) {
        const have = getItemCount(player, id);
        if (have < need * times)
            return;
    }
    for (const [id, amount] of Object.entries(recipe.input)) {
        removeItem(player, id, amount * times);
    }
    for (const [id, amount] of Object.entries(recipe.output)) {
        addItem(player, id, amount * times);
    }
}
export function craftById(player, recipeId) {
    const recipe = craftingRecipes[recipeId];
    if (!recipe)
        return;
    craftRecipe(player, recipe);
}
export function getXpForLevel(level) {
    return Math.floor(100 * Math.pow(1.5, level - 1));
}
export function getLevelForXp(xp) {
    let level = 1;
    while (xp >= getXpForLevel(level + 1)) {
        level++;
    }
    return level;
}
export function addXp(skill, amount) {
    skill.xp += amount;
    emit({ type: "XP_GAIN", skillId: skill.name, amount });
    const oldLevel = skill.level;
    skill.level = getLevelForXp(skill.xp);
    if (skill.level > oldLevel) {
        emit({ type: "LEVEL_UP", skillId: skill.name, oldLevel, newLevel: skill.level });
    }
}
export function offlineTickCalculation(player) {
    const timeAway = Date.now() - player.lastLogin;
    const ticks = Math.floor(timeAway / 1000);
    for (let i = 0; i < ticks; i++) {
        gameTick(player);
    }
}
export function addItem(player, itemId, amount = 1) {
    const existing = player.inventory.find(i => i.itemId === itemId);
    if (existing) {
        existing.quantity += amount;
    }
    else {
        player.inventory.push({
            itemId, quantity: amount
        });
    }
    emit({ type: "ITEM_GAIN", itemId, amount });
}
export function removeItem(player, itemId, amount) {
    const entry = player.inventory.find(i => i.itemId === itemId);
    if (!entry)
        return;
    entry.quantity -= amount;
    if (entry.quantity <= 0) {
        player.inventory = player.inventory.filter(i => i.itemId !== itemId);
    }
}
export function overAllSkillLevelCalculation() { }
//# sourceMappingURL=idleSystems.js.map