import {
  REMOVE_CARD,
  CollectionActionTypes,
  GET_LEADER,
  SET_LEADER,
  BUY_CARD,
  CardInterface,
  ADD_CARD,
} from '../../types/collection_types';
import { testData } from '../../extra/testData';
import { allCards } from '../../constants/cards';

interface CollectionState {
  ownedCards: CardInterface[];
  discoveredCards: CardInterface[];
  leader: CardInterface | undefined;
  gemCount: number;
  keyCount: number;
}

const initialState: CollectionState = {
  ownedCards: allCards.filter(it => testData.ownedCardIds.includes(it.id)),
  discoveredCards: allCards.filter(it =>
    testData.discoveredCardIds.includes(it.id),
  ),
  leader: undefined,
  gemCount: testData.gemCount,
  keyCount: testData.keyCount,
};

export function collectionReducer(
  // eslint-disable-next-line
  state: CollectionState = initialState,
  action: CollectionActionTypes,
): CollectionState {
  switch (action.type) {
    case BUY_CARD: {
      const { type, card } = action.payload;

      return {
        ...state,
        ownedCards: [...state.ownedCards, card],
        gemCount: type === 'gem' ? state.gemCount - card.price : state.gemCount,
        keyCount: type === 'key' ? state.keyCount - 1 : state.keyCount,
      };
    }
    case ADD_CARD: {
      return {
        ...state,
        ownedCards: [...state.ownedCards, action.payload.card],
      };
    }
    case REMOVE_CARD: {
      return {
        ...state,
        ownedCards: state.ownedCards.filter(it => it !== action.payload.card),
      };
    }
    case SET_LEADER: {
      return {
        ...state,
        leader: action.payload.leader,
      };
    }
    default:
      return state;
  }
}
