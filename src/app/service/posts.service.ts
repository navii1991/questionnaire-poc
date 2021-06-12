import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Post, Comment } from '../model/post.interface';
import * as fromApp from './../store/app.reducers';
import * as PostAction from '../component/store/post.action';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  posts$ = this.posts.asObservable(); 
  
  comments: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  comments$ = this.comments.asObservable();

  constructor(private httpClient: HttpClient, private store: Store<fromApp.AppState>) { 
    this.store.select('posts').subscribe(res=>{
      this.posts.next(res.posts);
      //this.comments.next(res.comments);
    });
    this.store.select('comments').subscribe(res=>{
      this.comments.next(res.comments)
    });
    this.getPosts().subscribe((res: Post[])=>{
      console.log('post',res);
     // this.posts.next(res);
     this.store.dispatch(new PostAction.PostLoaded(res));
    });
    this.getComments().subscribe((res: Comment[])=>{
      console.log('comment',res);
    //    this.comments.next(res);
      this.store.dispatch(new PostAction.CommentLoaded(res));
    });
  }

  getPosts() {
    return this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getComments() {
    return this.httpClient.get<Comment[]>('https://jsonplaceholder.typicode.com/comments');
  }


}
