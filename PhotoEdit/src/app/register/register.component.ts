import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../users';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  account: string;
  password: string;
  rePassword: string;

  constructor(private router:Router, private userService:UsersService) { }

  ngOnInit() {
  }

  onLoadPool(){
    this.router.navigate(['/']);
  }

  register()
  { 
    console.log(this.user.userName);
    if(this.account == null){
      alert("don't leave account it blank");
    }
    else if(this.user.userName == null){
      alert("don't leave userName it blank");
    }
    else if(this.password != null && this.password == this.rePassword){
      console.log("password match");
      this.user.account = this.account;
      this.user.password = this.password;
      this.userService.Register(this.user).subscribe(()=>
      {

      });
      this.router.navigate(['/']);
    }
    else{
      alert("invalid password");
    }
    
  }
}
