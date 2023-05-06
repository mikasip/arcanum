import { CardInterface, Spell } from './collection_types';
import { MapInterface, MissionInterface } from './mission_types';

export type CardItem = {
  card: CardInterface;
  active: boolean;
  damage?: number;
  activeSpell?: Spell;
};

export type StackParamList = {
  Missions: {
    map: MapInterface;
    heros: CardInterface[];
    leader: CardInterface;
  };
  Battle: {
    ownCards: CardInterface[];
    enemyCards: CardInterface[];
    ownLeader: CardInterface;
    enemyLeader: CardInterface;
  };
  Deck: {
    heros: CardInterface[];
  };
  CardSelection: {
    heros: CardInterface[];
  };
  DeckCreation: {
    heros: CardInterface[];
    mission?: MissionInterface;
    leader: CardInterface;
  };
  AllHeros: {
    heros: CardInterface[];
  };
};
