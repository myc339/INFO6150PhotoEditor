import { Component, OnInit } from '@angular/core';
import { PreviewService } from '../preview.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  Img : any;
  constructor(private previewService : PreviewService) {
   
   }
  ngOnInit() {
    this.previewService.getImg.subscribe((value)=>{
      
      this.Img = value;
      console.log(this.Img);
      console.log(typeof(this.Img));
    });
  }
  
}
