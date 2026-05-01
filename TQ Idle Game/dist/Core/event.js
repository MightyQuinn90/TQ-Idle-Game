const listeners = [];
export function onEvent(listener) {
    listeners.push(listener);
}
export function emit(event) {
    for (const l of listeners) {
        l(event);
    }
}
//# sourceMappingURL=event.js.map