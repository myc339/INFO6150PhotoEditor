
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {PreviewService} from '../preview.service';
import { ImagesInfo } from "../ImagesInfo";
import { LoadcloudimageService } from "../loadcloudimage.service";
import { Subscription } from "rxjs";

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

 
  @ViewChild('myCanvas') myCanvas:ElementRef;
  context:CanvasRenderingContext2D;
  ImagesInfo: ImagesInfo = new ImagesInfo();
  private paramsSubscription: Subscription;
  Img: any;
  left:Number=20;
  top:Number=20;
  
  constructor(private previewService: PreviewService) {
    
  }


  constructor(private router:Router) { }


  ngOnInit() {
    console.log(this.previewService.ImagesInfo);
    this.ImagesInfo=this.previewService.ImagesInfo;
    console.log(this.myCanvas)
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    var image = new Image();  //定义一个图片对象
    //image.src = this.previewService.ImagesInfo.cloudImg;
    image.src = "img/img.png";
    let context=this.context;
    image.onload = function() {
      context.drawImage(image, 0, 0);
    }

    
  }
  private draw() {
    this.context.beginPath();
    this.context.moveTo(0,0);
    this.context.lineTo(300,150);
    this.context.stroke();
  }
  

  

  goToConfirm(){
    this.router.navigate(['/confirm']);
  }
}
