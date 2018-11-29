import { Component, OnInit } from '@angular/core';
import { SharingdataService } from '../sharingdata.service';

@Component({
  selector: 'app-dispaly',
  templateUrl: './dispaly.component.html',
  styleUrls: ['./dispaly.component.scss']
})
export class DispalyComponent implements OnInit {
  imageUrl :any= "";
  height:string="400px";
  width:string="800px";
  left:string="30px";
  top:string="40px";
  
  constructor(private data:SharingdataService) { }

  ngOnInit() {
   
  }
  
  
}
