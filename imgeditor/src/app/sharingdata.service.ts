import { Injectable } from '@angular/core';
import {BehaviorSubject} from'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharingdataService {
  imgUrl:any="";
  width:any;
  height:any;
  // private messageSource=new BehaviorSubject("");
  // currentMessage=this.messageSource.asObservable();
  constructor() { }
  // getmessage()
  // {
  //   return this.currentMessage;
  // }
}
