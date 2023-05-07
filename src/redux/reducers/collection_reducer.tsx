import {
  GET_CARD,
  REMOVE_CARD,
  CollectionActionTypes,
  GET_LEADER,
  SET_LEADER,
} from '../../types/collection_types';
import { testData } from '../../extra/testData';

interface CollectionState {
  ownedCardIds: string[];
  discoveredCardIds: string[];
  leaderId: string | undefined;
}

const initialState: CollectionState = {
  ownedCardIds: testData.ownedCardIds,
  discoveredCardIds: testData.discoveredCardIds,
  leaderId: testData.leaderId,
};

export function collectionReducer(
  // eslint-disable-next-line
  state: CollectionState = initialState,
  action: CollectionActionTypes,
): CollectionState {
  switch (action.type) {
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
