import { emit } from "../../Core/event.js";
import { items } from "../../data/ItemData.js";
export function calculateDamage(attacker, defender, weaponId) {
    let weaponBonus = 0;
    if (weaponId) {
        weaponBonus = items[weaponId].attackPower || 0;
    }
    const attackPower = criticalHitChance(attacker);
    const rawdamage = attackPower - defender.defense;
    return Math.max(1, rawdamage);
}
export function applyDamage(target, amount, targetName) {
    const dodgeChance = target.speed / 100;
    if (Math.random() < dodgeChance) {
        emit({
            type: 'COMBAT_DAMAGE',
            message: `${targetName} dodged the attack.`
        });
        return;
    }
    target.hp = Math.max(0, target.hp - amount);
    emit({
        type: 'COMBAT_DAMAGE',
        message: `${targetName} took ${amount} damage! Hp is now ${target.hp}/${target.maxHp}.`
    });
}
export function criticalHitChance(entity) {
    const getRandomNumber = Math.random();
    if (getRandomNumber <= 0.2) {
        return entity.attack * 1.5;
    }
    else {
        return entity.attack;
    }
}
//# sourceMappingURL=damage.js.map