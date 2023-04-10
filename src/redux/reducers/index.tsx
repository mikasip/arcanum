import { combineReducers } from 'redux';
import { collectionReducer } from './collection_reducer';

export const rootReducer = combineReducers({
  collection: collectionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;