import { GET_CARD, REMOVE_CARD, CardInterface, CollectionActionTypes } from './types/collection_types';
import { testData } from '../../extra/testData';

interface CollectionState {
    cards: CardInterface[]
    deckHeros: CardInterface[]
}

const initialState: CollectionState = {
    cards: testData.heros,
    deckHeros: testData.deckHeros
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