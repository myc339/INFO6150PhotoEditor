import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Images } from '../Images';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {


  images:Images;
  width:"200px";
  height:"50px";
  constructor(private router: Router, private imageservice:ImagesService) { }

  ngOnInit() {
    this.imageservice.retriveAllImage().subscribe((images)=>{
      this.images=images;
      console.log(this.images);
    })
  }
  priview($event){
    console.log($event);
  }

  onLoadAddNew(){
    this.router.navigate(['preview']);
  }

  onLoadMoreInfo(){
    this.router.navigate(['preview']);
  }

}
