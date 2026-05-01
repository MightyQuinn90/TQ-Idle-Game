import type { LootDrop } from "../types/loot.js";

export const lootTables: Record<string, LootDrop[]> = {
  wooden_chest_loot: [
    {
      itemId: "gold_coin", //
      chance: 0.8,
      min: 10,
      max: 50,
    },
    {
      itemId: "iron_ore", //
      chance: 0.3,
      min: 1,
      max: 4,
    },
  ],
  iron_chest_loot: [],
  magic_chest_loot: [],

  enemy_slime_loot: [],
  enemy_goblin_loot: [],
  enemy_forest_spider: [],
};
