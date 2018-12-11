import { Component, OnInit } from '@angular/core';
import { PreviewService } from '../preview.service'
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  Img : String;
  constructor(private previewService : PreviewService) {
    previewService.getImg.subscribe((value:any)=>{
      console.log(value);
      this.Img = value;
    })
   }
  ngOnInit() {
  }
}
