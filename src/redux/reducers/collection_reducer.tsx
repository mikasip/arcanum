import { GET_CARD, REMOVE_CARD, CardInterface, CollectionActionTypes, CardBase } from './types/collection_types';
import { testData } from '../../extra/testData';

interface CollectionState {
    cards: CardBase[]
    deckHeros: CardBase[]
}

const initialState: CollectionState = {
    cards: testData.cardBases,
    deckHeros: testData.deckCardBases
};

export function collectionReducer(state: CollectionState = initialState, action: CollectionActionTypes): CollectionState {
    switch (action.type) {
        case GET_CARD: {
            return {
                ...state,
                deckHeros: action.payload
            };
        }
        case REMOVE_CARD: {
            return {
                ...state,
                deckHeros: action.payload
            };
        }
        default:
            return state
    }
};