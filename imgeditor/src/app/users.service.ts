import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  requestUrl:string='http://localhost:3301';
 constructor(private http:HttpClient){}
 Login(account:string,password:string)
 {
   return this.http.get<User>(this.requestUrl+'/login?account='+account+'&password='+password);
 }
 Register(user:User)
 {
  //  return this.http.post<User>(this.requestUrl+'/register/'+user);
 }
}
