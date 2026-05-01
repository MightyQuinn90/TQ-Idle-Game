import { createSecureContext } from "node:tls";
export function getTotalLevel(player) {
    const levels = Object.values(player.skills).map(s => s.level);
    return levels.reduce((sum, current) => sum + current, 0);
}
// export function getPlayerTotalLevel(player: Player): number {
//     const skillKeys = Object.keys(player.skills) as Array<keyof typeof player.skills>;
//     return skillKeys.reduce((acc, skill) => {
//         return acc + player.skills[skill].level;
//     }, 0);
// }
//# sourceMappingURL=skillSystems.js.map