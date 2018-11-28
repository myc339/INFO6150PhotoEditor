import { Component,ElementRef,Renderer2} from '@angular/core';
import { element } from '@angular/core/src/render3';
import { HttpClient } from "@angular/common/http";
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-final-image-editor';
  requestURL = "http://localhost:3301/users";
  account:string="";
  UserData: UserResponse;
  password:string="";
  Authentication:Boolean=false;
  authenticate()
  { 
    
    Object.keys(this.UserData).forEach(index=>{
      const user=this.UserData[index];
      if(user.account==this.account
        &&user.password==this.password)
          this.Authentication=true;
          
    });
    if(this.Authentication==true)
        console.log("log in successfully");
        else
        alert("user info error");
  }
  upload(event)
  {
    const files=event.target.files;
    
    const reader: FileReader = new FileReader();
    if(files)
    {
      Object.keys(files).forEach(index => {
        const file = files[index];
    reader.onload = function(e: ProgressEvent)  {
    const url = reader.result; // url
    const name = file.name; // get file name
    var img = document.createElement("img");
    var div = document.createElement("div");
    img.src=url.toString();
    var image = new Image();
    image.src = url.toString();
    var target=document.querySelector('.editor_area')
    let height = parseInt(window.getComputedStyle(target).height); //改变后的大小
    let width = parseInt(window.getComputedStyle(target).width);
    image.onload = function() {
      let image_width = image.width;
      let image_height = image.height;

      if (image_width  > width) {
        img.style.width =  width + "px";
        div.style.width =  width + "px";
      } else {
        img.style.width = image_width + "px";
        div.style.width = image_width + "px";
      }
      if (image_height > height) {
        img.style.height =  height + "px";
        div.style.height =  height + "px";
      } else {
        img.style.height = image_height + "px";
        div.style.height = image_height + "px";
      }
    };
    div.appendChild(img);
    document.querySelector('.editor_area').appendChild(div);
    };    
    reader.readAsDataURL(file); 
    });
    }
  }
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get<UserResponse>(this.requestURL).subscribe(data => {
      this.UserData = data;
      console.log(this.UserData);
      
    });
}
}
interface UserResponse {
  title: string;
  todo_item: string;
  author: string;
  date: Date;
}
