import fs from 'fs';
const SAVE_FILE = './save.json';
export function saveGame(player) {
    const data = JSON.stringify(player, null, 2);
    fs.writeFileSync(SAVE_FILE, data);
    console.log('[SYSTEM] Game Saved.');
}
export function loadGame() {
    if (!fs.existsSync(SAVE_FILE)) {
        console.log(`[SYSTEM] No save found.`);
    }
    const raw = fs.readFileSync(SAVE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    parsed.dateCreated = new Date(parsed.dateCreated);
    return parsed;
}
//# sourceMappingURL=save.js.map