export const mainPlayer = {
    id: 'PL_001',
    userName: 'Jim',
    dateCreated: new Date(),
    lastLogin: Date.now(),
    overAllSkillLevel: 0,
    skills: {
        woodcutting: { id: 'woodcutting', name: 'Woodcutting', xp: 0, level: 1 },
        mining: { id: 'mining', name: 'Mining', xp: 0, level: 1 },
        smithing: { id: 'smithing', name: 'Smithing', xp: 0, level: 1 },
        crafting: { id: 'crafting', name: 'Crafting', xp: 0, level: 1 },
        fishing: { id: 'fishing', name: 'Fishing', xp: 0, level: 1 }
    },
    inventory: [],
    currentActivity: null,
    currency: {
        gold: 0,
        silver: 0,
        copper: 0
    },
    combat: {
        hp: 100,
        maxHp: 100,
        attack: 5,
        defense: 3,
        speed: 1
    }
};
//# sourceMappingURL=Player.js.map