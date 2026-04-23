import { tickWoodcutting, tickMining, tickFishing, tickCrafting } from "./gathering.js"
import type { SkillHandler } from "../types/types.js"

export const skillTicks: Record<string, SkillHandler> = {
    woodcutting: tickWoodcutting,
    mining: tickMining, 
    fishing: tickFishing, 
    crafting: tickCrafting,
}