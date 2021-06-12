import { Action } from "@ngrx/store";
import { Post, Comment } from "../../model/post.interface";

export const POSTS_LOADED = '[Posts] Posts Loaded';
export const COMMENTS_LOADED = '[Posts] Comments Loaded';

export class PostLoaded implements Action {
    readonly type = POSTS_LOADED;

    constructor(public payload: Post[]) {}
}

export class CommentLoaded implements Action {
    readonly type = COMMENTS_LOADED;

    constructor(public payload: Comment[]) {}
}

export type PostAction = PostLoaded | CommentLoaded;