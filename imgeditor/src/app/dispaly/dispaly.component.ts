import { GetImageService } from './../get-image.service';
import { Component, OnInit } from '@angular/core';
import { SharingdataService } from '../sharingdata.service';

@Component({
  selector: 'app-dispaly',
  templateUrl: './dispaly.component.html',
  styleUrls: ['./dispaly.component.scss']
})
export class DispalyComponent implements OnInit {


  constructor(public service: GetImageService) {

    service.getImage.subscribe((value:any)=>{
      this.imageUrl = value;
  })
    //this.imageUrl = service.image;
  }


  ngOnInit() {
   
  }

  imageUrl: any;
  reset() {
    this.imageUrl = null;
    // this.croppedImage = null;
    // this.sliderValue = 0;
    // this.preValue = 0;
  }

}
