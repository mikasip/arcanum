import { combineReducers } from 'redux';
import { collectionReducer } from './collection_reducer';
import { missionReducer } from './mission_reducer';

export const rootReducer = combineReducers({
  collection: collectionReducer,
  missions: missionReducer,
});
