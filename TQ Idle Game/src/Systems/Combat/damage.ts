import type { CombatStats } from "../../types/combat.js"
import { emit } from "../../Core/event.js"
import type { ItemId } from "../../types/types.js"
import { items } from "../../data/ItemData.js"


export function calculateDamage(attacker: CombatStats, defender: CombatStats, weaponId?:ItemId): number {
    let weaponBonus = 0
    if(weaponId){
        weaponBonus = items[weaponId].attackPower || 0
    }
    const attackPower = criticalHitChance(attacker)
    const rawdamage = attackPower - defender.defense
    return Math.max(1, rawdamage)
}

export function applyDamage(target: CombatStats, amount: number, targetName: string){
    const dodgeChance = target.speed / 100
    if(Math.random() < dodgeChance){
        emit({
            type: 'COMBAT_DAMAGE', 
            message: `${targetName} dodged the attack.`
        })
            return 
    }

    target.hp = Math.max(0, target.hp - amount)
    emit({
        type: 'COMBAT_DAMAGE',
        message: `${targetName} took ${amount} damage! Hp is now ${target.hp}/${target.maxHp}.`
    })
}
export function criticalHitChance(entity: CombatStats): number{
    const getRandomNumber = Math.random()
    if (getRandomNumber <= 0.2){
        return entity.attack * 1.5
    } else {
        return entity.attack
    }
}