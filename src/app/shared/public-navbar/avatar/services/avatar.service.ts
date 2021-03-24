import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Image } from '@interfaces/userPublic.interface';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  // Observable stream sources
  private imageDataSource = new Subject<Image[] | string>();

  // Observable data streams
  imageData$ = this.imageDataSource.asObservable();

  // Service commands
  /** Actualiza el observable con el valor del argumento.
   * @params Array of info of the image.
   */
  setImageData(imageData: Image[] | string) {
    this.imageDataSource.next(imageData);
  }
}
