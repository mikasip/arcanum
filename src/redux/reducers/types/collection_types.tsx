import { ImageSourcePropType } from "react-native"

export type Race = "Fairy" | "Human" | "Creature" | "Ogre" | "Elf"

export class Spell {

}

export interface CardInterface {
    id: String
    image: ImageSourcePropType
    name: String
    description: String
    race: Race
    hp: number
    defence: number
    attack: number
    spells: Spell[]
}

export interface CardBase {
    image: ImageSourcePropType
    card?: CardInterface
}

export interface CollectionInterface {
    cards: CardInterface[]
}

export const GET_CARD = "GET_CARD"
export const REMOVE_CARD = "REMOVE_CARD"

interface GetCard {
    type: typeof GET_CARD,
    payload: CardInterface[]
}

interface RemoveCard {
    type: typeof REMOVE_CARD,
    payload: CardInterface[]
}

export type CollectionActionTypes = GetCard | RemoveCard