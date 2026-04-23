import type { Player, CraftingRecipe } from "../types/types.js"
import { addItem, removeItem } from "./InventorySystems.js"
import { getItemCount } from "./idleSystems.js"


export function canCraft(player: Player, recipe: CraftingRecipe): boolean {
    for (const [id, need] of Object.entries(recipe.input)){
        const have = getItemCount(player, id)

        if(have < need) return false
    }
    return true
}
export function craftRecipe(player: Player, recipe: CraftingRecipe, times: number = 1){
    for (const [id, need] of Object.entries(recipe.input)){
        const have = getItemCount(player, id)
        if(have < need * times) return
    }
    for (const[id, amount] of Object.entries(recipe.input)){
        removeItem(player, id, amount * times)
    }
    for (const [id, amount] of Object.entries(recipe.output)){
        addItem(player, id, amount * times)
    }
}