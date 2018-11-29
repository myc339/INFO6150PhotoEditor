import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetImageService {

  image:any = null;
  getImage: EventEmitter<any>
  constructor() {
    this.getImage = new EventEmitter();
   }
}
