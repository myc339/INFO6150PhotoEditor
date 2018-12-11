import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {
  Img :String;
  getImg:EventEmitter<any>
  constructor(){
    this.Img = "aa";
    this.getImg = new EventEmitter();
  }

}
