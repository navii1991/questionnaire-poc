import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Photo } from './../models/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private imageDataSubject = new BehaviorSubject<Photo[]>([]);
  imageData$ = this.imageDataSubject.asObservable();
  images: Photo[] = [];
  imageData: Photo[] = [];

  // private categoriesSubject = new BehaviorSubject<Array<string>>([]);
  // categories$ = this.categoriesSubject.asObservable();
  // categories: Array<string> = [];
  // allCategories: Array<string> = Array.from({ length: 1000 }, (_, i) => `item #${i}`);
  
  constructor(private httpClient: HttpClient) { 
    this.getPhotos().subscribe((res)=>{
      this.imageData = res;
      this.getNextImages();
    this.imageDataSubject.next(this.images);
    });

    

    // this.getNextItems();
    // this.categoriesSubject.next(this.categories);
  }
  
  loadMore(): void {
    // if (this.getNextItems()) {
    //   this.categoriesSubject.next(this.categories);
    // }
    if (this.getNextImages()) {
      this.imageDataSubject.next(this.images);
    }
  }

  // getNextItems(): boolean {
  //   if (this.categories.length >= this.allCategories.length) {
  //     return false;
  //   }
  //   const remainingLength = Math.min(100, this.allCategories.length - this.categories.length);
  //   this.categories.push(...this.allCategories.slice(this.categories.length, this.categories.length + remainingLength));
  //   return true;
  // }

  getNextImages(): boolean {
    if (this.images.length >= this.imageData.length) {
      return false;
    }
    const remainingLength = Math.min(100, this.imageData.length - this.images.length);
    this.images.push(...this.imageData.slice(this.images.length, this.images.length + remainingLength));
    return true;
  }

  getPhotos() {
    return this.httpClient.get<Photo[]>('https://jsonplaceholder.typicode.com/photos');
  }
}
