import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CropperService {
  // Observable data sources
  private imageDataSource = new Subject<string>();

  // Observable data streams
  imageData$ = this.imageDataSource.asObservable();

  // Service commands
  setImageSource(imageData: string) {
    this.imageDataSource.next(imageData);
  }

  setFallbackImage(fallbackImage: string) {
    this.imageDataSource.next(fallbackImage);
  }
}
