import { ImageSourcePropType } from "react-native"

export type Race = "Fairy" | "Human" | "Creature" | "Ogre" | "Elf"
export type EffectType = "passive" | "active"
export type SpellTargetGroup = "ally" | "enemy"
export type EffectLaunchHook = "startOfRound" | "endOfRound" | "startOfBattle" | "enemyDies" | "allyDies" | "allyAttack" | "enemyAttack"
export type CardType = "Hero" | "Minion" | "Leader"

export type ManipulateFunctionParams = {
    self: CardInterface,
    ownLeader: CardInterface,
    enemyLeader: CardInterface,
    allies: CardInterface[],
    enemies: CardInterface[],
    targets?: CardInterface[],
    deadAllies?: CardInterface[],
    deadEnemies?: CardInterface[],
    attackingAllies?: CardInterface[],
    attackingEnemies?: CardInterface[],
}

type manipulateFunction = (arg0: ManipulateFunctionParams) => ManipulateFunctionParams;

export interface Effect {
    type: EffectType
    targetGroup?: SpellTargetGroup
    effectLaunchHook: EffectLaunchHook
    targetEffect: boolean
    targetRace?: Race
    manipulateFunction: manipulateFunction
}

export interface Spell {
    name: string
    image: ImageSourcePropType
    description: string
    effects: Effect[]
}

export interface CardInterface {
    id: string
    image: ImageSourcePropType
    name: string
    description: string
    race: Race
    hp: number
    defence: number
    attack: number
    spells: Spell[]
    type: CardType
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