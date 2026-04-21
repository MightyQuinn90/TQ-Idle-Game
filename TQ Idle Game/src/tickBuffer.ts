export type TickLog = {
    lines: string[]
}

let buffer: TickLog | null = null

export function startTick() {
    buffer = { lines: [] }
}

export function logTick(line: string) {
    if (!buffer) return
    buffer.lines.push(line)
}

export function endTick(tickNumber: number) {
    if (!buffer) return

    console.log("\n====================")
    console.log(`Tick ${tickNumber}`)
    console.log("--------------------")

    for (const line of buffer.lines) {
        console.log(line)
    }

    console.log("====================\n")

    buffer = null
}