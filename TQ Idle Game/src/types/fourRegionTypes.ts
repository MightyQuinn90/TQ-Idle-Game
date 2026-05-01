


export interface GameRegion {
    id: 'north' | 'south' | 'east' | 'west'
    name: string
    bonusResources: string
    theme: {
        background: string
        musicTracks: string
        primaryRegionBackground: string
    }
}