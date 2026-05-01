import type { Player,ItemId } from "../types/types.js"
import { addXp } from "../Core/progression.js"
import { addItem, hasRoomForNewItem, removeItem} from "./InventorySystems.js"
import { canUseItem } from "./idleSystems.js"
import { getRandomItem } from "../Core/utils.js"
import { emit } from "../Core/event.js"
import { gatherSources, items } from "../data/ItemData.js"



export function tickGatheringSkill(player: Player, skillKey:  "woodcutting" | 'mining' | 'smithing' | 'crafting' | 'fishing' ){
    const skillState = player.skills[skillKey]
    const sourceList = gatherSources[skillKey]

    const availableItems = sourceList
        .filter(itemId => canUseItem(itemId, skillState.level))
        .map(id => ({id, item: items[id] }))
        if(availableItems.length === 0){
            emit({
                type: 'ACTION', 
                message: `Your ${skillKey} level is too low.`
            })
            return
        }

    const selected = getRandomItem(availableItems)
    if(!selected)
        return

    addItem(player, selected.id, 1)
    addXp(skillState, selected.item.xp)

    if (hasRoomForNewItem(player, selected.id)){
        addItem(player, selected.id, 1)
        emit({
            type:'ACTION', message: `You gathered a ${selected.item.name}`
        })
    } else {
        emit({
            type: 'SYSTEM', message: `Your inventory is to full for ${selected.item.name}.`
        })
    }

    if(player.inventory.length >= player.maxSlots - 3 && player.inventory.length < player.maxSlots){
        emit({
            type: 'SYSTEM',
            message: `Warning: Your inventory is almost full!`
        });
    }

    emit({
        type: 'ACTION',
        message: `You gathered: ${selected.item.name}(${skillKey})`
    })
}
// export function tickWoodcutting(player: Player){
//     const logs = gatherSources.woodcutting
//     .filter(log => canUseItem(log, player.skills.woodcutting.level))
//     .map((id: ItemId) => ({id, item: items[id]}))

//     if(logs.length === 0){
//         emit({
//             type: 'ACTION', 
//             message: "Your woodcuting is not high enough to do this."
//         })
//         return 
//     }
//     const randomLog = getRandomItem(logs)

//     if(!randomLog) return

//     addItem(player, randomLog.id, 1)
//     addXp(player.skills.woodcutting, randomLog.item.xp)

//     emit({
//         type: 'ACTION', 
//         message: `You chop a ${randomLog.item.name}`
//     })
// }
// export function tickMining(player: Player){
//     const ore = gatherSources.mining
//     .filter(ore => canUseItem(ore, player.skills.mining.level))
//     .map((id: ItemId) => ({id, item: items[id]}))

//     if(ore.length === 0){
//         emit({
//             type: "ACTION",
//             message: "Your mining is not high enough to do this."
//         })
//         return
//     }
//     const randomOre = getRandomItem(ore)
//     if(!randomOre) return

//     addItem(player, randomOre.id, 1)
//     addXp(player.skills.mining, randomOre.item.xp)

//     emit({
//         type: 'ACTION', 
//         message: `You mine a piece of ${randomOre.item.name}.`
//     })
// }
// export function tickFishing(player: Player){
//     const playerFishingLevel = player.skills.fishing
//     const fish = gatherSources.fishing
//     .filter(fish => canUseItem(fish, player.skills.fishing.level))
//     .map((id: ItemId) => ({id, item: items[id]}))

//     if(fish.length === 0){
//         emit({
//             type: 'ACTION', 
//             message: 'Your fishing is not high enough.'
//         })
//         return
//     }
    
//     const randomFish = getRandomItem(fish)
//     if(!randomFish) return

//     addItem(player, randomFish.id, 1)
//     addXp(playerFishingLevel, randomFish.item.xp)
// }
export function tickCrafting(){}