import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Images} from './Images';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  requestUrl:string='http://localhost:3301';
 constructor(private http:HttpClient){}
 retriveAllImage()
 {
  return this.http.get<Images>(this.requestUrl+'/Imagebank');
 }
 UploadNewImage(image:Images)
 {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  console.log(image.title);
  //console.log
  //console.log(image.imgpath);
  let body=JSON.stringify(image);
  console.log(body);
  return this.http.post<Images>(this.requestUrl+"/Imagebank/Save?",body,httpOptions);
 }
}
