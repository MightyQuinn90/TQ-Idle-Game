const backpack = [
    { id: 1, name: "Steel Longsword", type: "Weapon", value: 150, damage: 25, isTwoHanded: false },
    { id: 2, name: "Small Health Potion", type: "Potion", value: 50, healing: 30 },
    { id: 3, name: "Great Axe", type: "Weapon", value: 300, damage: 55, isTwoHanded: true },
    { id: 4, name: "Grappling Hook", type: "Utility", value: 75, description: "Reach high places" },
    { id: 5, name: "Superior Mana Potion", type: "Potion", value: 120, healing: 100 },
    { id: 6, name: "Wooden Club", type: "Weapon", value: 10, damage: 5, isTwoHanded: false },
    { id: 7, name: "Invisibility Cloak", type: "Utility", value: 500, description: "Hard to see" }
];
function getTypeWeapon(item) {
    return item.filter(i => i.type === 'Weapon');
}
// Find the average healing value of all potions in the backpack.
function getHealingAverage(item) {
    return item
        .filter(i => i.type === 'Potion')
        .reduce((accumulator, i) => {
        return (accumulator + i.healing) / 2;
    }, 0);
}
// console.log(getHealingAverage(backpack))
// The Problem: The King wants to know which weapons are the best value. Create a
// list of objects that only contains the 
// weapon name and a new property called efficiency (where efficiency = value / damage).
function getBestWeapons(weapon) {
    return weapon
        .filter(w => w.type === 'Weapon')
        .map(w => {
        return { ...w, efficiency: w.value / w.damage };
    });
}
console.log(getBestWeapons(backpack));
export {};
//# sourceMappingURL=array.js.map