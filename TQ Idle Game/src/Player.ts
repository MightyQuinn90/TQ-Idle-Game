import type { Player, Skill, Inventory, Item } from "./types.js";

const mainPlayer: Player = {
    id: 'PL_001',
    userName: 'Jim',
    dateCreated: new Date(),
    lastLogin: Date.now(), 
    overAllSkillLevel: 0,
    skills: [
        {id: 'woodcutting', name: 'Woodcutting'}
    ], 
    inventory: []
}