

export type Player = {
    id: string
    userName: string
    dateCreated: Date
    lastLogin: number
    overAllSkillLevel: number
    skills: Skill[]
    inventory: Inventory[]
}

export type Item = {
    id: string
    name: string
    value: number
}
export type Skill = {
    id: string
    name: string
}
export type Inventory = {
    itemId: string
    quantity: number
}