import type { Player, Inventory, Item, SkillId } from "./types.js";


export const mainPlayer: Player = {
    id: 'PL_001',
    userName: 'Jim',
    dateCreated: new Date(),
    lastLogin: Date.now(), 
    overAllSkillLevel: 0,
    skills: {
        woodcutting: {id: 'woodcutting', name: 'Woodcutting', xp: 0, level: 1},
        mining: {id: 'mining', name: 'Mining', xp: 0, level: 1}, 
        smithing: {id: 'smithing', name: 'Smithing', xp: 0, level: 1}, 
        crafting: {id: 'crafting', name: 'Crafting', xp: 0, level: 1},
        fishing: {id: 'fishing', name: 'Fishing', xp: 0, level: 1}
            }, 
    inventory: [],
    currentActivity: null
}

