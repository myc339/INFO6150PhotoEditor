import { ShareInfoClass } from './../shareInfoClass';
import { ShareInfoService } from './../share-info.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  shareInfoClass : ShareInfoClass = new ShareInfoClass;
  logoutLink = "/";
  signAsLink = "/";
  constructor(private router: Router, private shareInfoService:ShareInfoService) { 
    this.shareInfoService.change.subscribe((shareInfo: ShareInfoClass)=>{
      this.shareInfoClass = shareInfo;
    })
  }

  ngOnInit() {
  }

  logOut(){
    this.router.navigate(['/']);
    this.shareInfoClass.logIn = false;
  }
}
