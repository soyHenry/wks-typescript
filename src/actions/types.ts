import { FetchPostAction, DeletePostAction, LoadingAction } from './index';

export enum ActionTypes {
  fetchPosts,
  deletePost,
  loadingAction
}

export type Action = FetchPostAction | DeletePostAction | LoadingAction;
