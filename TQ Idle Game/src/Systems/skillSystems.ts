import { createSecureContext } from "node:tls";
import type { Player } from "../types/types.js";



export function getTotalLevel(player: Player): number {
    const levels = Object.values(player.skills).map(s => s.level)
    return levels.reduce((sum, current) => sum + current, 0)
}


// export function getPlayerTotalLevel(player: Player): number {
//     const skillKeys = Object.keys(player.skills) as Array<keyof typeof player.skills>;
    
//     return skillKeys.reduce((acc, skill) => {
//         return acc + player.skills[skill].level;
//     }, 0);
// }