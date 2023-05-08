import { CardInterface, Spell } from './collection_types';
import { MissionInterface } from './mission_types';

export type CardItem = {
  card: CardInterface;
  active: boolean;
  damage?: number;
  activeSpell?: Spell;
};

export type StackParamList = {
  Missions: {};
  Battle: {
    ownCards: CardInterface[];
    enemyCards: CardInterface[];
    ownLeader: CardInterface;
    enemyLeader: CardInterface;
  };
  Deck: {};
  CardSelection: {
    cards: CardInterface[];
  };
  DeckCreation: {
    mission?: MissionInterface;
  };
  AllHeros: {};
};
