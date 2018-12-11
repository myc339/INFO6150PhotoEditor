import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {
  Img :any;
  getImg:EventEmitter<any>
  constructor(){
    
    this.getImg = new EventEmitter();
  }

}
