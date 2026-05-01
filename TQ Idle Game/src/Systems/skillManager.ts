import { tickGatheringSkill } from "./gathering.js"
import type { SkillHandler } from "../types/types.js"
import { playerGoesFirst } from "./Combat/combatSystems.js"




export const skillTicks: Record<string, SkillHandler> = {
    woodcutting: (player) => tickGatheringSkill(player, "woodcutting"),
    mining: (player) => tickGatheringSkill(player, 'mining'),
    fishing: (player) => tickGatheringSkill(player, 'fishing'),
    smithing: (player) => tickGatheringSkill(player, 'smithing'),
    crafting: (player) => tickGatheringSkill(player, 'crafting')

}