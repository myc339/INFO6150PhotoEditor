import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispaly',
  templateUrl: './dispaly.component.html',
  styleUrls: ['./dispaly.component.scss']
})
export class DispalyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  imageUrl = null;
  reset() {
    this.imageUrl = null;
    // this.croppedImage = null;
    // this.sliderValue = 0;
    // this.preValue = 0;
  }

}