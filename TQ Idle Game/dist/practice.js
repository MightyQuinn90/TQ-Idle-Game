const market = [
    { id: 1, owner: "Alaric", type: "Blacksmith", isOpen: true, inventoryValue: 2500, stock: ["Longsword", "Shield", "Mace"] },
    { id: 2, owner: "Zora", type: "Alchemy", isOpen: true, inventoryValue: 1200, stock: ["Health Pot", "Mana Pot"] },
    { id: 3, owner: "Gimble", type: "General", isOpen: false, inventoryValue: 500, stock: ["Rope", "Torch"] },
    { id: 4, owner: "Hilda", type: "Blacksmith", isOpen: true, inventoryValue: 4000, stock: ["Full Plate", "Warhammer"] },
    { id: 5, owner: "Finn", type: "Alchemy", isOpen: false, inventoryValue: 800, stock: ["Poison", "Antidote"] },
    { id: 6, owner: "Bree", type: "General", isOpen: true, inventoryValue: 150, stock: ["Apple", "Bread", "Cheese"] }
];
function theOpenMarket(market) {
    return market
        .filter(m => m.isOpen === true)
        .map(m => m.owner);
}
console.log(theOpenMarket(market));
export {};
//# sourceMappingURL=practice.js.map