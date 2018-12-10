import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {User} from'../users';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router : Router, private userService:UsersService) { }
 
  user: User=new User();
  Authentication: boolean = false;
  validation:boolean=false;
  authenticate() {
    this.UsersLogin();
    
  }
  LogOut()
  {
    this.Authentication=false;
    this.user.account="";
    this.user.password="";
  }
  register()
  {
    this.userService.Register(this.user).subscribe(()=>
    {
     
    });
  }

  ngOnInit() {
   this.user={
     userName:"",
     account:"",
     password:"",
  
   }
  }
  private UsersLogin() {
    console.log(this.user.account+this.user.password);
    this.userService.Login(this.user.account, this.user.password).subscribe(users =>{ 
      this.user = users;
      if(users!==null)
      {
        this.Authentication=true;
       
      }
    }
      );
  }

  onLoadPreview(){
    this.router.navigate(['/pool']);
  }

}
