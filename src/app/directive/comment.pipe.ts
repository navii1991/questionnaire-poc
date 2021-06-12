import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from 'src/app/model/post.interface';

@Pipe({name: 'filterComments'})
export class FilterCommentsPipe implements PipeTransform {
  transform(value: Comment[], postId = 1): Comment[] {
   const cmt =  value.filter((comment) => { 
        return comment.id == postId;
    });
    return cmt;
  }
}