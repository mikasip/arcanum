import { GET_CARD, REMOVE_CARD, CollectionActionTypes, CardInterface, SET_LEADER, GET_LEADER } from '../types/collection_types';
import { collectionService } from '../../../services/collection_services';
import { request, failure } from './common_actions';
import { ActionCreator } from 'redux';
import { FetchActionTypes } from '../types/common_types';
import { AppDispatch } from '../../store';

const getCardSuccess: ActionCreator<CollectionActionTypes> = (cards: string[]) => {
  return { type: GET_CARD, payload: cards };
}
const removeCardSuccess: ActionCreator<CollectionActionTypes> = (cards: string[]) => {
  return { type: REMOVE_CARD, payload: cards };
}
const setLeaderSuccess: ActionCreator<CollectionActionTypes> = (leaderId: string) => {
  return { type: SET_LEADER, payload: leaderId };
}
const getLeaderSuccess: ActionCreator<CollectionActionTypes> = (leaderId: string) => {
  return { type: GET_LEADER, payload: leaderId };
}

export function getCard() {
  return (dispatch: AppDispatch) => { // async action: uses Redux-Thunk middleware to return a function instead of an action creator
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

export function removeCard({ cardId }: { cardId: string }) {
  return (dispatch: AppDispatch) => {
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

export function setLeader(leaderId: string) {
  return (dispatch: AppDispatch) => {
    dispatch(request());
    return collectionService.setLeader(leaderId)
      .then(
        response => {
          dispatch(setLeaderSuccess(response))
        },
        error => {
          dispatch(failure('Server error.'))
        })
  }
}

export function getLeader() {
  return (dispatch: AppDispatch) => {
    dispatch(request());
    return collectionService.getLeader()
      .then(
        response => {
          dispatch(getLeaderSuccess(response))
        },
        error => {
          dispatch(failure('Server error.'))
        })
  }
}