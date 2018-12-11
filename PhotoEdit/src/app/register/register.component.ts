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
    if(this.password == this.rePassword){
      console.log("password match");
      this.user.account = this.account;
      this.user.password = this.password;
      this.userService.Register(this.user).subscribe(()=>
      {

      });
      this.router.navigate(['/']);
    }
    
  }
}
