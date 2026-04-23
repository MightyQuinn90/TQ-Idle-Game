export function getRandomItem(array) {
    if (array.length === 0) {
        throw new Error("Array Empty");
    }
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}
//# sourceMappingURL=utils.js.map