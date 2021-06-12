import { Post, Comment } from '../../model/post.interface';
import * as fromPostAction from './post.action';

export interface State {
    posts: Post[];
    comments: Comment[];
}
const initialState: State  = {
    posts: [],
    comments: []
}

export function postReducer(
    state: State = initialState,
    action: fromPostAction.PostAction): State {
    switch (action.type) {
        case fromPostAction.POSTS_LOADED:
            return {
                ...state,
                posts: [...state.posts, ...action.payload]
            }
        case fromPostAction.COMMENTS_LOADED:
            return {
                ...state,
                comments: [...state.comments, ...action.payload]
            }    
        default:
            return state;
    }
}