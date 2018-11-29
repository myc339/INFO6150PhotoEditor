import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {User} from'../users';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  
  constructor(private userService:UsersService) { }
  account: string = "";
  userName: string = "";
  users: User;
  password: string = "";
  Authentication: Boolean = false;
  authenticate() {
    this.UsersLogin();
    
  }
  LogOut()
  {
    this.Authentication=false;
    this.account="";
    this.password="";
  }
  ngOnInit() {
  }
  private UsersLogin() {
    this.userService.Login(this.account, this.password).subscribe(users =>{ 
      this.users = users;
      if(users!==null)
      {
        this.Authentication=true;
        this.userName=users.userName;
        console.log(this.userName);
      }
    }
      );
  }
}
