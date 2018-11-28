import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:Http) { }

  // getAllUsers()
  // {
  //   return this.http.get('/api/todos').map((res)=>{
  //     console.log(res);
  //     return res.json();});
  // }
}
