import type { Monster, MonsterId } from "../types/combat.js";
import type { LootDrop } from "../types/combat.js";




export const Monsters: Record<string, Monster> = {
    slime: {
        id: 'slime', 
        name: 'Green Slime', 
        level: 1, 
        stats: {
            hp: 30, maxHp: 30, attack: 5, defense: 2, speed: 1
        },
        xpValue: 5,
        lootTable: [
            {itemId: 'gold_coin', chance: 1.0, min: 1, max: 5},
            {itemId: 'silver_coin', chance: 1.0, min: 1, max: 5}, 
            {itemId: 'copper_coin', chance: 1.0, min: 1, max: 5}
        ]
    }, 
    goblin: {
        id: 'goblin',
        name: 'Green Goblin', 
        level: 2, 
        stats: {
            hp: 20, maxHp: 20, attack: 8, defense: 4, speed: 8
        },
        xpValue: 7, 
        lootTable: [
            {itemId: 'gold_coin', chance: 1.0, min: 1, max: 5},
            {itemId: 'silver_coin', chance: 1.0, min: 1, max: 5}, 
            {itemId: 'copper_coin', chance: 1.0, min: 1, max: 5}
        ]
    },
    "forest-spider": {
        id: 'forest-spider', 
        name: 'Forest Spider', 
        level: 2, 
        stats: {
            hp: 40, maxHp: 40, attack: 7, defense: 3, speed: 6
        },
        xpValue: 8,
        lootTable: [
            {itemId: 'gold_coin', chance: 1.0, min: 1, max: 5},
            {itemId: 'silver_coin', chance: 1.0, min: 1, max: 5}, 
            {itemId: 'copper_coin', chance: 1.0, min: 1, max: 5}
        ]
    }

}

export function createMonster(id: MonsterId): Monster {
    const monsterTemplate = Monsters[id]
    if(!monsterTemplate){
        throw new Error (`Monster ${id} not found.`)
    }
    return {
        ...monsterTemplate, 
        stats: {...monsterTemplate?.stats},
        lootTable:[...monsterTemplate?.lootTable]
    }
}
