import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../service/http.service';
import { Photo } from './../models/photo.interface';

@Component({
  selector: 'app-img-gallery',
  templateUrl: './img-gallery.component.html',
  styleUrls: ['./img-gallery.component.scss']
})

export class ImgGalleryComponent implements OnInit {

  flexSize: string = '25%';
  categories$: Observable<Array<string>> = new Observable();
  imageData$: Observable<Photo[]> = new Observable();
  loadMoreButton:boolean = true;
  loadSize: number = 20;

  constructor(private httpService: HttpService) {
    this.imageData$ = this.httpService.imageData$;
    this.httpService.loadSize = this.loadSize;
  }

  ngOnInit(): void {}

  onScrollingFinished() {
    console.log('load more');
    this.httpService.loadMore();
  }

  changeFlexSize(size: string) {
    this.flexSize = size;
  }
  
  changeLoadType(loadType: string) {
    this.loadMoreButton = !this.loadMoreButton
  }

  changeLoadSize(loadSize: number) {
    this.loadSize = loadSize;
    this.httpService.loadSize = this.loadSize;
  }
  
}
