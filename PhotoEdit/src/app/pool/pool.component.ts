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

  width:Number=200;
  height:Number=500;
  


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
    console.log($event.target.src);
    
    this.getUrlBase64($event.target.src,'png',function (base64) {
      console.log(base64);//base64编码值
  });
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
