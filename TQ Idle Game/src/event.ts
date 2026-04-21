export type GameEvent =
    | { type: "ITEM_GAIN"; itemId: string; amount: number }
    | { type: "ITEM_REMOVE"; itemId: string; amount: number }
    | { type: "XP_GAIN"; skillId: string; amount: number }
    | { type: "LEVEL_UP"; skillId: string; oldLevel: number; newLevel: number }
    | { type: "ACTION"; message: string }
    | { type: "SYSTEM"; message: string }

type Listener = (event: GameEvent) => void

const listeners: Listener[] = []

export function onEvent(listener: Listener) {
    listeners.push(listener)
}

export function emit(event: GameEvent) {
    for (const l of listeners) {
        l(event)
    }
}