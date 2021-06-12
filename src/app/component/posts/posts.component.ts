import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post, Comment } from 'src/app/model/post.interface';
import { PostsService } from 'src/app/service/posts.service';
import * as fromApp from './../../store/app.reducers';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  
  posts$: Observable<Post[]> = new Observable<Post[]>();
  comments$: Observable<Comment[]> = new Observable<Comment[]>();
  comments:Comment[] = [];

  constructor(private postsService: PostsService, private store: Store<fromApp.AppState>) { 
    this.posts$ = this.postsService.posts$;
    this.comments$ = this.postsService.comments$;
    this.postsService.comments$.subscribe((res: Comment[]) =>
    {
      console.log(res);
      this.comments=res
    })
    
  }

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsService.getComments();
  }
}