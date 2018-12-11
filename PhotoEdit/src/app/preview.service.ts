import { Injectable, EventEmitter } from '@angular/core';
import { ImagesInfo } from './ImagesInfo';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PreviewService {
 
  ImagesInfo:ImagesInfo;
  getImg:any;
  constructor(){ 
    this.getImg = new EventEmitter();
  }

}
