import { ImageSourcePropType } from "react-native"

export interface CardInterface {
    id: String
    image: ImageSourcePropType
    name: String
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