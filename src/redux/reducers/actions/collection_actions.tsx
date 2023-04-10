import { GET_CARD, REMOVE_CARD, CollectionActionTypes, CardInterface } from '../types/collection_types';
import { collectionService } from '../../../services/collection_services';
import { request, failure } from './common_actions';
import { ActionCreator } from 'redux';
import { FetchActionTypes } from '../types/common_types';

const getCardSuccess: ActionCreator<CollectionActionTypes> = (cards: CardInterface[]) => {
  return { type: GET_CARD, payload: cards };
}
const removeCardSuccess: ActionCreator<CollectionActionTypes> = (cards: CardInterface[]) => {
  return { type: REMOVE_CARD, payload: cards };
}

export function getCard() {
    return (dispatch: (arg0: CollectionActionTypes | FetchActionTypes) => void) => { // async action: uses Redux-Thunk middleware to return a function instead of an action creator
      dispatch(request());
      return collectionService.getCard()
        .then(
          response => {
            dispatch(getCardSuccess(response))
          },
          error => {
            dispatch(failure('Server error.'))
          })
    }
  }
  
  export function removeCard({ cardId }: { cardId: String}) {
    return (dispatch: (arg0: CollectionActionTypes | FetchActionTypes) => void) => {
      dispatch(request());
      return collectionService.removeCard({ cardId })
        .then(
          response => {
            dispatch(removeCardSuccess(response))
          },
          error => {
            dispatch(failure('Server error.'))
          })
    }
  }