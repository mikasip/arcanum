import { ActionCreator } from 'redux';
import {
  FETCH_REQUEST,
  FETCH_FAILURE,
  FetchActionTypes,
} from '../types/common_types';

export const request: ActionCreator<FetchActionTypes> = () => {
  return { type: FETCH_REQUEST };
};
export const failure: ActionCreator<FetchActionTypes> = (error: any) => {
  return { type: FETCH_FAILURE, payload: error };
};
