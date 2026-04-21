import { log } from "console";
import { arch } from "os";
export const items = {
    oak_log: { name: 'Oak Log', value: 15, xp: 21, type: 'log', stackable: true, levelReq: 1 },
    molded_log: { name: 'Molded Log', value: 32, xp: 29, type: 'log', stackable: true, levelReq: 20 },
    burned_log: { name: 'Burned Log', value: 38, xp: 45, type: 'log', stackable: true, levelReq: 45 },
    aged_log: { name: 'Aged Log', value: 41, xp: 67, type: 'log', stackable: true, levelReq: 60 },
    copper_ore: { name: 'Copper Ore', value: 18, xp: 19, type: 'ore', stackable: true, levelReq: 10 },
    iron_ore: { name: 'Iron Ore', value: 26, xp: 24, type: 'ore', stackable: true, levelReq: 25 },
    molded_arrow: { name: 'Molded Arrow', value: 9, xp: 15, type: 'arrow', stackable: true, levelReq: 15 },
    copper_bar: { name: 'Copper Bar', value: 57, xp: 61, type: 'bar', stackable: true, levelReq: 18 },
    coal_ore: { name: 'Coal Ore', value: 38, xp: 89, type: 'ore', stackable: true, levelReq: 30 },
    iron_bar: { name: 'Iron Bar', value: 49, xp: 91, type: 'bar', stackable: true, levelReq: 30 },
    crystal_shard: { name: 'Crystal Shard', value: 60, xp: 100, type: 'ore', stackable: true, levelReq: 105 },
    gold_ore: { name: 'Gold Ore', value: 70, xp: 68, type: 'ore', stackable: true, levelReq: 40 },
    stone_ore: { name: 'Stone', value: 10, xp: 14, type: 'ore', stackable: true, levelReq: 1 },
    mythril_ore: { name: 'Mythril Ore', value: 130, xp: 99, type: 'ore', stackable: true, levelReq: 90 },
    ancient_fossil: { name: 'Ancient Fossil', value: 150, xp: 120, type: 'material', stackable: true, levelReq: 100 },
    stone_block: { name: 'Stone Block', value: 4, xp: 19, type: 'material', stackable: true, levelReq: 1 },
    gold_bar: { name: 'Gold Bar', value: 98, xp: 150, type: 'bar', stackable: true, levelReq: 55 },
    refined_crystal: { name: 'Refined Crystal', value: 180, xp: 150, type: 'material', stackable: true, levelReq: 110 },
    mythril_bar: { name: 'Mythril Bar', value: 160, xp: 139, type: 'bar', stackable: true, levelReq: 95 },
    stone_bar: { name: 'Stone Bar', value: 80, xp: 51, type: 'bar', stackable: true, levelReq: 25 },
    hardened_arrow: { name: 'Hardened Arrow', value: 30, xp: 20, type: 'arrow', stackable: true, levelReq: 35 },
    simple_arrow: { name: 'Simple Arrow', value: 20, xp: 21, type: 'arrow', stackable: true, levelReq: 1 },
    refined_arrow: { name: 'Refined Arrow', value: 50, xp: 44, type: 'arrow', stackable: true, levelReq: 60 },
    pine_log: { name: 'Pine Log', value: 23, xp: 24, type: 'log', stackable: true, levelReq: 5 },
    birch_log: { name: 'Birch Log', value: 25, xp: 29, type: 'log', stackable: true, levelReq: 10 },
    maple_log: { name: 'Maple Log', value: 27, xp: 32, type: 'log', stackable: true, levelReq: 20 },
    black_walnut_log: { name: 'Black Walnut Log', value: 29, xp: 44, type: 'log', stackable: true, levelReq: 35 },
    hardwood_log: { name: 'Hardwood Log', value: 45, xp: 56, type: 'log', stackable: true, levelReq: 45 },
    treated_log: { name: 'Treated Log', value: 67, xp: 43, type: 'log', stackable: true, levelReq: 60 },
    spiritwood_log: { name: 'Spiritwood Log', value: 71, xp: 77, type: 'log', stackable: true, levelReq: 85 },
    ancientwood_log: { name: 'Ancientwood Log', value: 75, xp: 91, type: 'log', stackable: true, levelReq: 110 },
    obsidian_ore: { name: 'Obsidian Ore', value: 55, xp: 67, type: 'ore', stackable: true, levelReq: 60 },
    cobalt_ore: { name: 'Cobalt Ore', value: 65, xp: 45, type: 'ore', stackable: true, levelReq: 70 },
    tin_ore: { name: 'Tin Ore', value: 21, xp: 23, type: 'ore', stackable: true, levelReq: 5 },
    silver_ore: { name: 'Silver Ore', value: 28, xp: 31, type: 'ore', stackable: true, levelReq: 20 },
    silver_bar: { name: 'Silver Bar', value: 31, xp: 31, type: 'bar', stackable: true, levelReq: 35 },
    tin_bar: { name: 'Tin Bar', value: 23, xp: 25, type: 'bar', stackable: true, levelReq: 15 },
    cobalt_bar: { name: 'Cobalt Bar', value: 34, xp: 37, type: 'bar', stackable: true, levelReq: 75 },
    obsidian_bar: { name: 'Obsidian Bar', value: 54, xp: 76, type: 'bar', stackable: true, levelReq: 70 },
    bronze_bar: { name: 'Bronze Bar', value: 11, xp: 13, type: 'bar', stackable: true, levelReq: 10 },
    electrum_bar: { name: 'Electrum Bar', value: 67, xp: 65, type: 'bar', stackable: true, levelReq: 80 },
    crystal_alloy_bar: { name: 'Crystal Alloy Bar', value: 76, xp: 78, type: 'bar', stackable: true, levelReq: 120 },
    minnow_fish: { name: 'Minnow fish', value: 13, xp: 12, type: 'fish', stackable: true, levelReq: 1 },
    carp_fish: { name: 'Carp Fish', value: 17, xp: 15, type: 'fish', stackable: true, levelReq: 5 },
    perch_fish: { name: 'Perch Fish', value: 21, xp: 19, type: 'fish', stackable: true, levelReq: 10 },
    trout_fish: { name: 'Trout Fish', value: 29, xp: 24, type: 'fish', stackable: true, levelReq: 20 },
    reef_fish: { name: 'Reef Fish', value: 33, xp: 29, type: 'fish', stackable: true, levelReq: 30 },
    salmon_fish: { name: 'Salmon Fish', value: 42, xp: 44, type: 'fish', stackable: true, levelReq: 45 },
    seabass_fish: { name: 'Seabass Fish', value: 49, xp: 57, type: 'fish', stackable: true, levelReq: 60 },
    sword_fish: { name: 'Sword Fish', value: 56, xp: 78, type: 'fish', stackable: true, levelReq: 75 },
    golden_fish: { name: 'Golden Fish', value: 67, xp: 83, type: 'fish', stackable: true, levelReq: 90 },
    dragon_fish: { name: 'Dragon Fish', value: 78, xp: 89, type: 'fish', stackable: true, levelReq: 105 },
    crystal_fish: { name: 'Crystal Fish', value: 86, xp: 98, type: 'fish', stackable: true, levelReq: 120 },
    ancient_fish: { name: 'Ancient Fish', value: 99, xp: 117, type: 'fish', stackable: true, levelReq: 140 }
};
export const gatherSources = {
    woodcutting: [
        'oak_log', 'molded_log', 'burned_log', 'aged_log', 'pine_log', 'birch_log',
        'maple_log', 'black_walnut_log', 'hardwood_log', 'treated_log', 'spiritwood_log',
        'ancientwood_log'
    ],
    mining: [
        'copper_ore', 'iron_ore', 'coal_ore', 'crystal_shard', 'gold_ore',
        'stone_ore', 'mythril_ore', 'ancient_fossil', 'obsidian_ore', 'cobalt_ore',
        'tin_ore', 'silver_ore'
    ],
    smithing: [
        'copper_bar', 'iron_bar', 'mythril_bar', 'stone_bar', 'refined_crystal', 'silver_bar',
        'tin_bar', 'cobalt_bar', 'obsidian_bar', 'bronze_bar', 'electrum_bar', 'crystal_alloy_bar',
        'gold_bar'
    ],
    crafting: [
        'molded_arrow', 'simple_arrow', 'hardened_arrow', 'refined_arrow', 'stone_block'
    ],
    fishing: [
        'minnow_fish', 'carp_fish', 'perch_fish', 'trout_fish', 'salmon_fish', 'reef_fish',
        'seabass_fish', 'sword_fish', 'golden_fish', 'dragon_fish', 'crystal_fish', 'ancient_fish'
    ]
};
export const craftingRecipes = {
    molded_arrow: {
        input: { molded_log: 1, iron_ore: 1 },
        output: { molded_arrow: 2 }
    },
    simple_arrow: {
        input: { oak_log: 3, iron_ore: 1 },
        output: { simple_arrow: 3 }
    },
    hardened_arrow: {
        input: { simple_arrow: 5, burned_log: 2 },
        output: { hardened_arrow: 5 }
    },
    refined_arrow: {
        input: { burned_log: 3, simple_arrow: 5 },
        output: { refined_arrow: 5 }
    },
    copper_bar: {
        input: { copper_ore: 2, coal_ore: 1 },
        output: { copper_bar: 1 }
    },
    iron_bar: {
        input: { iron_ore: 2, coal_ore: 1 },
        output: { iron_bar: 1 }
    },
    stone_bar: {
        input: { stone_ore: 5, copper_ore: 2 },
        output: { stone_bar: 1 }
    },
    mythril_bar: {
        input: { mythril_ore: 5, coal_ore: 4 },
        output: { mythril_bar: 1 }
    },
    refined_crystal: {
        input: { crystal_shard: 7, mythril_bar: 1 },
        output: { refined_crystal: 1 }
    },
    gold_bar: {
        input: { gold_ore: 3, coal_ore: 5 },
        output: { gold_bar: 1 }
    },
    crystal_alloy_bar: {
        input: { refined_crystal: 5, mythril_bar: 3 },
        output: { crystal_alloy_bar: 1 }
    },
    tin_bar: {
        input: { tin_ore: 2, coal_ore: 1 },
        output: { tin_bar: 1 }
    },
    bronze_bar: {
        input: { tin_bar: 2, copper_bar: 2 },
        output: { bronze_bar: 1 }
    },
    obsidian_bar: {
        input: { obsidian_ore: 3, coal_ore: 7 },
        output: { obsidian_bar: 1 }
    },
    electrum_bar: {
        input: { electrum_ore: 4, coal_ore: 3, refined_crystal: 2 },
        output: { electrum_bar: 2 }
    },
    cobalt_bar: {
        input: { cobalt_ore: 5, coal_ore: 5 },
        output: { cobalt_ore: 1 }
    },
    stone_block: {
        input: { stone_ore: 2, coal_ore: 1 },
        output: { stone_block: 1 }
    }
};
//# sourceMappingURL=ItemData.js.map