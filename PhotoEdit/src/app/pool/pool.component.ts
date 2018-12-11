import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Images } from '../Images';
import { ImagesService } from '../images.service';
import { PreviewService } from '../preview.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {


  images:Images;
  width:"200px";
  height:"50px";

  constructor(private imageservice:ImagesService, private previewService:PreviewService,private router: Router) {
    
   }


  ngOnInit() {
    this.imageservice.retriveAllImage().subscribe((images)=>{
      this.images=images;
      console.log(this.images);
    })
    this.previewService.getImg.emit("aa");
  }
  priview($event){
    console.log($event);
  }
  
  upload(){
  }

  onLoadAddNew(){
    this.router.navigate(['preview']);
  }

  onLoadMoreInfo(){
    this.router.navigate(['preview']);
  }

}
