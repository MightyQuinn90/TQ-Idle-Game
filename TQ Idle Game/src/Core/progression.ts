import type { Player, PlayerSkill } from "../types/types.js"
import { emit } from "./event.js"


export function getXpForLevel(level: number): number {
    return Math.floor(100 * Math.pow(1.5, level - 1))
}

export function getLevelForXp(xp: number): number {
    let level = 1 
    while (xp >= getXpForLevel(level + 1)){
        level++
    }
    return level
}

export function addXp(skill: PlayerSkill, amount: number){
    skill.xp += amount

    emit({type: "XP_GAIN", skillId: skill.name, amount})

    const oldLevel = skill.level
    skill.level = getLevelForXp(skill.xp)
    if (skill.level > oldLevel){
        emit({type: "LEVEL_UP", skillId: skill.name, oldLevel, newLevel: skill.level})
    }
}
export function syncStatsWithLevels(player: Player){
    player.combat.maxHp = player.skills.health.level * 10
    player.combat.attack = player.skills.attack.level + 5
    player.combat.defense = player.skills.defense.level

    if(player.combat.hp > player.combat.maxHp){
        player.combat.hp = player.combat.maxHp
    }
}