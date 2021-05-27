import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Photo } from './../model/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private imageDataSubject = new BehaviorSubject<Photo[]>([]);
  imageData$ = this.imageDataSubject.asObservable();
  images: Photo[] = [];
  imageData: Photo[] = [];
  loadSize: number = 10;
  
  constructor(private httpClient: HttpClient) { 
    this.getPhotos().subscribe((res)=>{
      this.imageData = res.slice(0,999);
      this.getNextImages();
      this.imageDataSubject.next(this.images);
    });
  }
  
  loadMore(): void {
    if (this.getNextImages()) {
      this.imageDataSubject.next(this.images);
    }
  }

  getNextImages(): boolean {
    if (this.images.length >= this.imageData.length) {
      return false;
    }
    const remainingLength = Math.min(this.loadSize, this.imageData.length - this.images.length);
    this.images.push(...this.imageData.slice(this.images.length, this.images.length + remainingLength));
    return true;
  }

  getPhotos() {
    return this.httpClient.get<Photo[]>('https://jsonplaceholder.typicode.com/photos');
  }
}
