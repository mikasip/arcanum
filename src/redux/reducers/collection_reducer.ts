import {
  GET_CARD,
  REMOVE_CARD,
  CollectionActionTypes,
  GET_LEADER,
  SET_LEADER,
  BUY_CARD,
} from '../../types/collection_types';
import { testData } from '../../extra/testData';

interface CollectionState {
  ownedCardIds: string[];
  discoveredCardIds: string[];
  leaderId: string | undefined;
  gemCount: number;
  keyCount: number;
}

const initialState: CollectionState = {
  ownedCardIds: testData.ownedCardIds,
  discoveredCardIds: testData.discoveredCardIds,
  leaderId: testData.leaderId,
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
      const { type, amount } = action.payload;
      return {
        ...state,
        ownedCardIds: [...state.ownedCardIds, action.payload.cardId],
        gemCount: type === 'gem' ? state.gemCount - amount : state.gemCount,
        keyCount: type === 'key' ? state.keyCount - amount : state.keyCount,
      };
    }
    case GET_CARD: {
      return {
        ...state,
        ownedCardIds: action.payload,
      };
    }
    case REMOVE_CARD: {
      return {
        ...state,
        ownedCardIds: action.payload,
      };
    }
    case GET_LEADER: {
      return {
        ...state,
        leaderId: action.payload,
      };
    }
    case SET_LEADER: {
      return {
        ...state,
        leaderId: action.payload,
      };
    }
    default:
      return state;
  }
}
