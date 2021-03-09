import { combineReducers } from 'redux';
import { postsReducer } from './posts';
import { Post } from '../actions';

export interface StoreState {
  posts: Post[];
}

export const reducers = combineReducers<StoreState>({
  posts: postsReducer
});
