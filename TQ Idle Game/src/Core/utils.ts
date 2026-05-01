


export function getRandomItem<T>(array: T[]): T  {
    if (array.length === 0) {
        throw new Error("Array Empty")
    }
    const index = Math.floor(Math.random() * array.length)
    return array[index]!
}