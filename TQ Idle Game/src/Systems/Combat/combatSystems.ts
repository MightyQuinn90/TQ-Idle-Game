
import { emit } from "../../Core/event.js";
import { addXp } from "../../Core/progression.js";
import type { CombatState, CombatStats, Monster, MonsterId } from "../../types/combat.js";
import type { Player } from "../../types/types.js";
import { syncStatsWithLevels } from "../../Core/progression.js";
import { gameState } from "../../Core/gameState.js";
import { createMonster } from "../../data/monsterData.js";
import { rollLootTable } from "../Economy/lootSystems.js";




export function calculateDamage(attacker: CombatStats, defender: CombatStats): number {
    const rawdamage = attacker.attack - defender.defense
    return Math.max(1, rawdamage)
}

export function applyDamage(target: CombatStats, amount: number, targetName: string){
    target.hp = Math.max(0, target.hp - amount)
    emit({
        type: 'COMBAT_DAMAGE',
        message: `${targetName} took ${amount} damage! Hp is now ${target.hp}/${target.maxHp}.`
    })
}
export function handleCombatXp(player: Player, damageDealt: number){
    const totalXp = damageDealt * 4
    const attackXp = Math.floor(totalXp * 0.8)
    const healthXp = Math.floor(totalXp * 0.2)

    addXp(player.skills.attack, attackXp)
    addXp(player.skills.health, healthXp)

    syncStatsWithLevels(player)
}
export function performAttack(player: Player, monster: Monster){
    const damage = calculateDamage(player.combat, monster.stats)
    applyDamage(monster.stats, damage, monster.name)
    handleCombatXp(player, damage)
}
export function processCombatTicks(player: Player, combatState: CombatState){
    if(!combatState.targetMonster || !combatState.isInCombat) return

    const monster = combatState.targetMonster
    const damage = performAttack(player,monster)
    combatState.combatLog.push(`You hit ${monster.name} for ${damage}.`)

    if(monster.stats.hp <= 0){
        combatState.combatLog.push(`${monster.name} died.`)

        rollLootTable(player, monster.lootTable)

        combatState.targetMonster = null
        combatState.isInCombat = false

        return
    }

    const monsterDamage = calculateDamage(monster.stats, player.combat)
    applyDamage(player.combat, monsterDamage, 'You')
    combatState.combatLog.push(`${monster.name} hit you for ${monsterDamage}.`)

    combatState.turnNumber++
}
export function handleRespawn(player: Player, monsterId: MonsterId){
    if(player.currentActivity === 'combat' && gameState.activeEnemies.length === 0){
        const newMonster = createMonster(monsterId)
        gameState.activeEnemies.push(newMonster)

            emit({
        type: 'SYSTEM', 
        message: `A new ${newMonster.name} appears.`
        })
    }   
}