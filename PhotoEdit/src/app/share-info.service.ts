import { ShareInfoClass } from './shareInfoClass';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareInfoService {
  shareInfo: ShareInfoClass;
  logIn : Boolean = false;
  userName : string;
  change : EventEmitter<any>;
  constructor() {
    this.change = new EventEmitter();
   }
}
