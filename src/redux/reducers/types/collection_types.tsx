import { ImageSourcePropType } from "react-native"

export type Race = "Fairy" | "Human" | "Creature" | "Ogre" | "Elf"
export type SpellType = "passive" | "active"
export type SpellTargetGroup = "ally" | "enemy" | "enemyLeader" | "allyLeader"
export type EffectLaunchHook = "startOfRound" | "endOfRound" | "startOfBattle" | "enemyDies" | "allyDies" | "allyAttack" | "enemyAttack" | "allySpell" | "enemySpell"
export type CardType = "Hero" | "Minion" | "Leader"

export type BattleState = {
    active?: CardInterface,
    ownLeader: CardInterface,
    enemyLeader: CardInterface,
    allies: CardInterface[],
    enemies: CardInterface[],
    targets?: CardInterface[],
    deadAllies: CardInterface[],
    deadEnemies: CardInterface[],
    attackingAllies?: CardInterface[],
    attackingEnemies?: CardInterface[],
}

export interface Effect {
    targetGroup?: SpellTargetGroup
    effectLaunchHook?: EffectLaunchHook
    targetEffect: boolean
    targetRace?: Race
    manipulateFunctionId: string
}

export interface Spell {
    name: string
    image: ImageSourcePropType
    description: string
    effects: Effect[]
    type: SpellType
    manaCost: number
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
export const SET_LEADER = "SET_LEADER"
export const GET_LEADER = "GET_LEADER"

interface GetCard {
    type: typeof GET_CARD,
    payload: string[]
}
interface RemoveCard {
    type: typeof REMOVE_CARD,
    payload: string[]
}
interface SetLeader {
    type: typeof SET_LEADER,
    payload: string
}
interface GetLeader {
    type: typeof GET_LEADER,
    payload: string
}

export type CollectionActionTypes = GetCard | RemoveCard | SetLeader | GetLeader