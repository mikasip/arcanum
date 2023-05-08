import { ImageSourcePropType } from 'react-native';

export type Race = 'Fairy' | 'Human' | 'Creature' | 'Ogre' | 'Elf';
export type SpellType = 'passive' | 'active';
export type SpellTargetGroup =
  | 'ally'
  | 'enemy'
  | 'enemyLeader'
  | 'allyLeader'
  | 'movedAlly';

export type CardType = 'Hero' | 'Minion' | 'Leader';

export type EffectLaunchHook =
  | 'startOfOwnTurn'
  | 'endOfOwnTurn'
  | 'startOfEnemyTurn'
  | 'endOfEnemyTurn'
  | 'startOfBattle'
  | 'enemyDies'
  | 'allyDies'
  | 'allyAttack'
  | 'enemyAttack'
  | 'allySpell'
  | 'enemySpell';

export interface Effect {
  targetGroup?: SpellTargetGroup[];
  effectLaunchHook?: EffectLaunchHook;
  targetEffect: boolean;
  targetRace?: Race;
  manipulateFunctionId: string;
}

export interface Spell {
  name: string;
  image: ImageSourcePropType;
  description: string;
  effects: Effect[];
  type: SpellType;
  manaCost: number;
}

export interface CardInterface {
  id: string;
  image: ImageSourcePropType;
  name: string;
  description: string;
  race: Race;
  hp: number;
  defence: number;
  attack: number;
  spells: Spell[];
  type: CardType;
  price: number;
}

export type BattleState = {
  active?: CardInterface;
  activeSpell?: Spell;
  ownLeader: CardInterface;
  enemyLeader: CardInterface;
  allies: CardInterface[];
  enemies: CardInterface[];
  movedAllies: CardInterface[];
  ownMana: number;
  enemyMana: number;
  ownBattlePoints: number;
  enemyBattlePoints: number;
  roundNumber: number;
  targets?: CardInterface[];
  deadAllies: CardInterface[];
  deadEnemies: CardInterface[];
  attackingAllies?: CardInterface[];
  attackingEnemies?: CardInterface[];
};

export interface CardBase {
  image: ImageSourcePropType;
  card?: CardInterface;
}

export interface CollectionInterface {
  cards: CardInterface[];
}

export const ADD_CARD = 'ADD_CARD';
export const BUY_CARD = 'BUY_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const SET_LEADER = 'SET_LEADER';
export const GET_LEADER = 'GET_LEADER';

interface AddCard {
  type: typeof ADD_CARD;
  payload: {
    card: CardInterface;
  };
}
interface RemoveCard {
  type: typeof REMOVE_CARD;
  payload: {
    card: CardInterface;
  };
}
interface SetLeader {
  type: typeof SET_LEADER;
  payload: {
    leader: CardInterface;
  };
}

export interface BuyCard {
  type: 'BUY_CARD';
  payload: {
    card: CardInterface;
    type: 'gem' | 'key';
  };
}

export type CollectionActionTypes = AddCard | RemoveCard | SetLeader | BuyCard;
