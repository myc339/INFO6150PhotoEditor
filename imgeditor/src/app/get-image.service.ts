import { ImageInfo } from './imageInfo';
import { Injectable, EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GetImageService {

  imageInfo:ImageInfo;
  getImage: EventEmitter<any>
  constructor() {
    this.getImage = new EventEmitter();
   }
}
