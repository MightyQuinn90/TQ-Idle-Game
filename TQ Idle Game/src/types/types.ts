import type { CombatStats } from "./combat.js";

export type Player = {
  id: string;
  userName: string;
  dateCreated: Date;
  lastLogin: number;
  overAllSkillLevel: number;
  skills: Record<SkillId, PlayerSkill>;
  inventory: Inventory[];
  maxSlots: number;
  currentActivity: SkillId | CombatId | null;
  currency: CurrencyTypes;
  combat: CombatStats;
  equipment: {
    primary: ItemId | null;
  };
};

export type Item = {
  name: string;
  value: number;
  xp: number;
  type: ItemTypes;
  stackable: boolean;
  levelReq?: number;
  description?: string;
  lootTableId?: string;
  attackPower?: number;
  speedBonus?: number;
  healAmount?: number;
  defenseBonus?: number;
};
export type CurrencyTypes = {
  gold: number;
  silver: number;
  copper: number;
};
export type ItemTypes =
  | "fish"
  | "log"
  | "ore"
  | "bar"
  | "crafting"
  | "arrow"
  | "material"
  | "currency"
  | "equipment"
  | "resource"
  | "consumeable"
  | "chest"
  | "weapon";

export type ItemEntry = {
  id: string;
  item: Item;
};

export type Inventory = {
  itemId: string;
  quantity: number;
};
export type PlayerSkill = {
  id: string;
  name: string;
  xp: number;
  level: number;
};
export type CraftingRecipe = {
  input: Record<string, number>;
  output: Record<string, number>;
};
export type SkillId =
  | "woodcutting"
  | "mining"
  | "smithing"
  | "crafting"
  | "fishing"
  | "health"
  | "attack"
  | "defense";

export type CombatId = "combat";

export type ItemId =
  | "oak_log"
  | "molded_log"
  | "burned_log"
  | "aged_log"
  | "pine_log"
  | "birch_log"
  | "maple_log"
  | "black_walnut_log"
  | "hardwood_log"
  | "treated_log"
  | "spiritwood_log"
  | "ancientwood_log"
  | "copper_ore"
  | "iron_ore"
  | "coal_ore"
  | "crystal_shard"
  | "gold_ore"
  | "stone_ore"
  | "mythril_ore"
  | "ancient_fossil"
  | "obsidian_ore"
  | "cobalt_ore"
  | "tin_ore"
  | "silver_ore"
  | "copper_bar"
  | "iron_bar"
  | "mythril_bar"
  | "stone_bar"
  | "refined_crystal"
  | "silver_bar"
  | "tin_bar"
  | "cobalt_bar"
  | "obsidian_bar"
  | "bronze_bar"
  | "electrum_bar"
  | "crystal_alloy_bar"
  | "molded_arrow"
  | "simple_arrow"
  | "hardened_arrow"
  | "refined_arrow"
  | "minnow_fish"
  | "carp_fish"
  | "perch_fish"
  | "trout_fish"
  | "salmon_fish"
  | "reef_fish"
  | "seabass_fish"
  | "sword_fish"
  | "golden_fish"
  | "dragon_fish"
  | "crystal_fish"
  | "ancient_fish"
  | "stone_block"
  | "gold_bar"
  | "gold_coin"
  | "silver_coin"
  | "copper_coin"
  | "wooden_chest"
  | "splintered_club"
  | "rust_shortsword"
  | "iron_broadsword"
  | "steel_schmitar"
  | "spite_blade";

export type SkillHandler = (player: Player) => void;

