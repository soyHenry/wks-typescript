import { combineReducers } from 'redux';
import { postsReducer, PostStoreState } from './posts';

export interface StoreState {
  postsState: PostStoreState
}

export const reducers = combineReducers<StoreState>({
  postsState: postsReducer
});
