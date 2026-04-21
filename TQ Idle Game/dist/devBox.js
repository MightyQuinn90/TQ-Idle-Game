import readline from "readline";
import { gameTick, addItem, removeItem, craftById } from "./idleSystems.js";
import { mainPlayer } from "./Player.js";
import { initLogger } from "./logger.js";
import { saveGame, loadGame } from "./save.js";
//readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//readlineCommands
rl.on("line", (input) => {
    const args = input.trim().split(" ");
    const command = args[0];
    switch (command) {
        case "do":
            handleSetActivity(args);
            break;
        case "t":
            gameTick(mainPlayer);
            printPlayer();
            break;
        case "tick":
            handleTick(args);
            break;
        case "add":
            handleAdd(args);
            break;
        case "remove":
            handleRemove(args);
            break;
        case "craft":
            handleCraft(args);
            break;
        case "inv":
            printInventory();
            break;
        case "xp":
            handleXp(args);
            break;
        case "player":
            printFullPlayer();
            break;
        case "help":
            printHelp();
            break;
        case "save":
            saveGame(mainPlayer);
            break;
        case "load":
            const loaded = loadGame();
            if (!loaded) {
                console.log('No save file found.');
                break;
            }
            Object.assign(mainPlayer, loaded);
            console.log('Game loaded!');
            break;
        default:
            console.log("Unknown command. Type 'help' for list.");
    }
});
function handleTick(args) {
    const times = Number(args[1]) || 1;
    for (let i = 0; i < times; i++) {
        gameTick(mainPlayer);
    }
    console.log(`Ran ${times} ticks`);
}
function handleSetActivity(args) {
    const skill = args[1];
    if (!skill) {
        console.log('Usage: do [skill]');
        return;
    }
    if (!(skill in mainPlayer.skills)) {
        console.log('Skill does not exist');
        return;
    }
    mainPlayer.currentActivity = skill;
    console.log(`Now training: ${skill}`);
}
function handleAdd(args) {
    const itemId = args[1];
    const amount = Number(args[2]) || 1;
    if (!itemId) {
        console.log("Usage: add [itemId] [amount]");
        return;
    }
    addItem(mainPlayer, itemId, amount);
    console.log(`Added ${amount} ${itemId}`);
}
function handleRemove(args) {
    const itemId = args[1];
    const amount = Number(args[2]) || 1;
    if (!itemId) {
        console.log("Usage: remove [itemId] [amount]");
        return;
    }
    removeItem(mainPlayer, itemId, amount);
    console.log(`Removed ${amount} ${itemId}`);
}
function handleCraft(args) {
    const recipeId = args[1];
    //incorporate crafting mroe than 1 at a time
    //inclue the ammount
    if (!recipeId) {
        console.log("Usage: craft [recipeId]");
        return;
    }
    craftById(mainPlayer, recipeId);
    console.log(`Craft attempt: ${recipeId}`);
}
function handleXp(args) {
    const amount = Number(args[1]) || 0;
    mainPlayer.skills.woodcutting.xp += amount;
    console.log(`Added ${amount} XP to Woodcutting`);
}
function printInventory() {
    console.log("\nInventory:");
    if (mainPlayer.inventory.length === 0) {
        console.log("(empty)");
        return;
    }
    for (const item of mainPlayer.inventory) {
        console.log(`- ${item.itemId}: ${item.quantity}`);
    }
}
function printPlayer() {
    const activity = mainPlayer.currentActivity;
    if (!activity) {
        console.log('\nNo active skill');
        return;
    }
    const skill = mainPlayer.skills[activity];
    console.log(`\nCurrent Activity: ${activity}`);
    console.log(`Level: ${skill.level}`);
    console.log(`Xp: ${skill.xp}`);
}
function printFullPlayer() {
    console.log(JSON.stringify(mainPlayer, null, 2));
}
//If I forget something
function printHelp() {
    console.log(`
Commands:
t                   -> run 1 tick
tick [n]            -> run n ticks
do [skill]          -> set current activity(woodcutting, mining, ect...)
add [id] [amt]      -> add item
remove [id] [amt]   -> remove item
craft [id]          -> craft recipe
inv                 -> show inventory
xp [amount]         -> add woodcutting xp
player              -> print full player object
help                -> show commands
  `);
}
console.log('Type "help" for commands');
initLogger();
//# sourceMappingURL=devBox.js.map