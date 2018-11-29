import { Component, OnInit } from '@angular/core';
import { SharingdataService } from '../sharingdata.service';

@Component({
  selector: 'app-dispaly',
  templateUrl: './dispaly.component.html',
  styleUrls: ['./dispaly.component.scss']
})
export class DispalyComponent implements OnInit {
  imageUrl :any= "";
  constructor(private data:SharingdataService) { }

  ngOnInit() {
   
  }
  
  reset() {
    this.imageUrl = null;
    // this.croppedImage = null;
    // this.sliderValue = 0;
    // this.preValue = 0;
  }

}
