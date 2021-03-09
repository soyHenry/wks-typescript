import { Post } from '../actions';
import { ActionTypes,  Action } from '../actions/types';

export interface PostStoreState {
  posts: Post[];
  loading: boolean;
}

const initialState: PostStoreState = {
  posts: [],
  loading: false
};

export const postsReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchPosts:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    case ActionTypes.deletePost:
      return {
        ...state,
        posts: state.posts.filter((post: Post) => post.id !== action.payload),
        loading: false
      }
    case ActionTypes.loadingAction:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
