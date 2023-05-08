import { ActionCreator } from 'redux';
import {
  ADD_CARD,
  REMOVE_CARD,
  CollectionActionTypes,
  SET_LEADER,
  GET_LEADER,
  CardInterface,
  BUY_CARD,
} from '../../../types/collection_types';
import { collectionService } from '../../../services/collection_services';
import { request, failure } from './common_actions';
import { AppDispatch } from '../../store';

const addCardSuccess: ActionCreator<CollectionActionTypes> = (
  card: CardInterface,
) => {
  return { type: ADD_CARD, payload: { card } };
};
const removeCardSuccess: ActionCreator<CollectionActionTypes> = (
  card: CardInterface,
) => {
  return { type: REMOVE_CARD, payload: { card } };
};
const setLeaderSuccess: ActionCreator<CollectionActionTypes> = (
  leader: CardInterface,
) => {
  return { type: SET_LEADER, payload: { leader } };
};
const buyCardSuccess: ActionCreator<CollectionActionTypes> = (
  card: CardInterface,
) => {
  return {
    type: BUY_CARD,
    payload: {
      card,
      type: 'gem',
    },
  };
};

export function addCard(card: CardInterface) {
  return (dispatch: AppDispatch) => {
    // async action: uses Redux-Thunk middleware to return a function instead of an action creator
    dispatch(request());
    return collectionService.addCard(card).then(
      response => {
        dispatch(addCardSuccess(response));
      },
      () => {
        dispatch(failure('Server error.'));
      },
    );
  };
}

export function buyCard(card: CardInterface) {
  return (dispatch: AppDispatch) => {
    // async action: uses Redux-Thunk middleware to return a function instead of an action creator
    dispatch(request());
    return collectionService.buyCard(card).then(
      response => {
        dispatch(buyCardSuccess(response));
      },
      error => {
        dispatch(failure(error.message));
      },
    );
  };
}

export function removeCard(card: CardInterface) {
  return (dispatch: AppDispatch) => {
    dispatch(request());
    return collectionService.removeCard(card).then(
      response => {
        dispatch(removeCardSuccess(response));
      },
      () => {
        dispatch(failure('Server error.'));
      },
    );
  };
}

export function setLeader(leader: CardInterface) {
  return (dispatch: AppDispatch) => {
    dispatch(request());
    return collectionService.setLeader(leader).then(
      response => {
        dispatch(setLeaderSuccess(response));
      },
      () => {
        dispatch(failure('Server error.'));
      },
    );
  };
}
