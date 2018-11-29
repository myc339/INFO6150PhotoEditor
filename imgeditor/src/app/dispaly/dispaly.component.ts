import { Component, OnInit } from '@angular/core';
import { SharingdataService } from '../sharingdata.service';

@Component({
  selector: 'app-dispaly',
  templateUrl: './dispaly.component.html',
  styleUrls: ['./dispaly.component.scss']
})
export class DispalyComponent implements OnInit {
  imageUrl :any= "";
  height:string="1600px";
  width:string="2160px";
  left:string="0px";
  top:string="0px";
  
  constructor(private data:SharingdataService) { }

  ngOnInit() {
   
  }
  
  
}
