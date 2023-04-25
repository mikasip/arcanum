import { ImageSourcePropType } from "react-native"
import { CardInterface } from "./collection_types"

export interface MissionInterface {
    id: string,
    name: string,
    x: number,
    y: number,
    radius: number,
    locked: boolean,
    enemies: CardInterface[],
}

export interface MapInterface {
    image: ImageSourcePropType,
    missions: MissionInterface[],
    originalWidth: number,
    originalHeight: number,
}

export const COMPLETE_MISSION = "COMPLETE_MISSION"

interface CompleteMission {
    type: typeof COMPLETE_MISSION,
    payload: MapInterface,
}

export type MissionActionTypes = CompleteMission