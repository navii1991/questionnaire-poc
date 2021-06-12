import { ActionReducerMap } from '@ngrx/store';
import * as fromPost from './../component/store/post.reducers';
import * as fromAppAction from './app.action'

export interface AppState {
    posts: fromPost.State;
    comments: fromPost.State
}

export const appReducer: ActionReducerMap<AppState, fromAppAction.AppAction> = {
    posts: fromPost.postReducer,
    comments: fromPost.postReducer
}