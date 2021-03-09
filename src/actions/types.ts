import { FetchPostAction, DeletePostAction } from './index';

export enum ActionTypes {
  fetchPosts,
  deletePost
}

export type Action = FetchPostAction | DeletePostAction;
