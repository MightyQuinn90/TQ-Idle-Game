let buffer = null;
export function startTick() {
    buffer = { lines: [] };
}
export function logTick(line) {
    if (!buffer)
        return;
    buffer.lines.push(line);
}
export function endTick(tickNumber) {
    if (!buffer)
        return;
    console.log("\n====================");
    console.log(`Tick ${tickNumber}`);
    console.log("--------------------");
    for (const line of buffer.lines) {
        console.log(line);
    }
    console.log("====================\n");
    buffer = null;
}
//# sourceMappingURL=tickBuffer.js.map