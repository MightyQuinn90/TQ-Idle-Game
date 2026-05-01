import type { 
    Player, PlayerSkill, Item, Inventory, SkillId, CraftingRecipe,ItemEntry, ItemId, SkillHandler
            } from "../types/types.js";

import { items, gatherSources, craftingRecipes } from "../data/ItemData.js";
import { craftRecipe } from "./crafting.js";
import { emit } from "../Core/event.js";
import { addItem, removeItem } from "./InventorySystems.js";
import { getXpForLevel, addXp, getLevelForXp } from "../Core/progression.js";
import { skillTicks } from "./skillManager.js";


//I need a tickGathering Function that is all encompassing. 3 almost identical functions are no good. DRY!

export function gameTick(player: Player){
    const activity = player.currentActivity
    if (!activity) return
    const handler = skillTicks[activity]
    if (!handler) return
    handler(player)
}
export function offlineTickCalculation(player: Player){
    const timeAway = Date.now() - player.lastLogin
    const ticks = Math.floor(timeAway / 1000)   
    for(let i = 0; i < ticks; i++){
        gameTick(player)
    }
}
export function tickCrafting(player: Player){}

export function canUseItem(logId:ItemId, level: number): boolean{
    const item = items[logId]
    return level >= (item.levelReq ?? 0)
}
export function getItemCount(player: Player, itemId: string): number {
    return player.inventory.find(i => i.itemId === itemId)?.quantity ?? 0
}
export function craftById(player: Player, recipeId: string){
    const recipe = craftingRecipes[recipeId]
    if (!recipe) return
    craftRecipe(player, recipe)
}

export function overAllSkillLevelCalculation(){}
