import { ImageInfo } from './../imageInfo';
import { GetImageService } from './../get-image.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispaly',
  templateUrl: './dispaly.component.html',
  styleUrls: ['./dispaly.component.scss']
})
export class DispalyComponent implements OnInit {

  imageUrl :any= "";
  height:number=1000;
  width:number=1500;
  height_num:number=1000;
  width_num:number=1500;
  img_height:number;
  img_width:number;
  left:number=0;;
  top:number=0;
  imageInfo:ImageInfo = new ImageInfo();



  constructor(public service: GetImageService) {

    service.getImage.subscribe((value:any)=>{
      this.imageInfo = value;
  })
    //this.imageUrl = service.image;
  }



  ngOnInit() {
   
  }

}
