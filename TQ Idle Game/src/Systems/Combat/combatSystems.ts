
import { emit } from "../../Core/event.js";
import { addXp } from "../../Core/progression.js";
import type { CombatState, CombatStats, Monster, MonsterId } from "../../types/combat.js";
import type { ItemId, Player } from "../../types/types.js";
import { syncStatsWithLevels } from "../../Core/progression.js";
import { gameState } from "../../Core/gameState.js";
import { createMonster } from "../../data/monsterData.js";
import { rollLootTable } from "../Economy/lootSystems.js";
import { calculateDamage, applyDamage } from "./damage.js";
import { items } from "../../data/ItemData.js";
import { addItem, removeItem } from "../InventorySystems.js";



export function playerGoesFirst(player: CombatStats, monster: CombatStats){
    return player.speed >= monster.speed
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
    return damage
}


export function processCombatTicks(player: Player, combatState: CombatState){
    if(!combatState.targetMonster || !combatState.isInCombat) return

    const monster = combatState.targetMonster
    const damage = performAttack(player,monster)
    combatState.combatLog.push(`You hit ${monster.name} for ${damage}.`)

    if(monster.stats.hp <= 0){
        combatState.combatLog.push(`${monster.name} died.`)

        rollLootTable(player, monster.lootTable)

        if(monster.stats.hp <= 0){
            handleMonsterDeath(player, combatState)
            return
        }

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
export function handleMonsterDeath(player: Player, combatState: CombatState){
    const monster = combatState.targetMonster
    if(!monster) 
        return

    combatState.combatLog.push(`${monster.name} died`)
    rollLootTable(player, monster.lootTable)

    const oldMonsterId = monster.id
    combatState.targetMonster = null

    setTimeout(() => {
        handleRespawn(player, oldMonsterId)
        if(gameState.activeEnemies.length > 0){
            const nextMonster = gameState.activeEnemies[0]

            if(nextMonster){
                combatState.targetMonster = nextMonster
                combatState.isInCombat = true
                gameState.activeEnemies = []
            }
        }
    }, 1000)
}
export function startCombatLoop(player: Player, monsterId: MonsterId){
    const {combat} = gameState
    if(combat.isInCombat) return

    const monster = createMonster(monsterId)
    combat.targetMonster = monster
    combat.isInCombat = true
    combat.turnNumber = 1 
    combat.combatLog.push(`Combat started against ${monster.name}`)

    combat.combatInterval = window.setInterval(() => {
        if(!combat.isInCombat || !combat.targetMonster){
            stopCombat()
            return
        }
        
        processCombatTicks(player, combat)

        if(player.combat.hp <= 0){
        handlePlayerDeath(player)
    }
    }, 2000)
}

export function handlePlayerDeath(player: Player){
    const {combat} = gameState
    stopCombat()
    
    combat.combatLog.push(`You have been defeated!`)
    player.combat.hp = player.combat.maxHp

    player.currentActivity = null

    emit({
        type: 'SYSTEM',
        message: 'You died and returned to town'
    })
}

export function stopCombat(){
    const {combat} = gameState
    if(combat.combatInterval){
        clearInterval(combat.combatInterval)
        combat.combatInterval = null
    }
    combat.isInCombat = false
    combat.targetMonster = null
}


export function equipWeapon(player: Player, weaponId: ItemId){
    const item = items[weaponId]
    
    // player.stats.speed = player.baseSpeed + (weaponId.speedBonus ?? 0)
    // dont hvae baseSpeed or speedBonus 
    // this will add the weapons speed bonus to the player

    if(!item || item.type !== 'weapon')
        return 

    if(player.equipment.primary){
        addItem(player, player.equipment.primary, 1)
    }

    player.equipment.primary = weaponId
    removeItem(player, weaponId, 1)
    
    emit({type: 'SYSTEM', message: `You equipped ${item.name}`})
}
