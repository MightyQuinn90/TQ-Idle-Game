import type { ItemId } from "./types.js"



export type MarketListing = {
    listingId: string
    sellerId: string
    itemId: ItemId
    quantity: number
    pricePerItem: number
    timeStamp: number
}