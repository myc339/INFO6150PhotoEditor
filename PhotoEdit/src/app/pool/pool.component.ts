import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoadAddNew(){
    this.router.navigate(['preview']);
  }

  onLoadMoreInfo(){
    this.router.navigate(['preview']);
  }

}
