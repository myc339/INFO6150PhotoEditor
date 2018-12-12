
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {PreviewService} from '../preview.service';
import { ImagesInfo } from "../ImagesInfo";
import { LoadcloudimageService } from "../loadcloudimage.service";
import { Subscription } from "rxjs";
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
  grayscaleOn:boolean = false;
  contrastOn:boolean = false;
  blurOn:boolean = false;
  saturateOn:boolean = false;
  brightnessOn:boolean = false;
  hue_rotateOn:boolean = false;
  invertOn:boolean = false;
  drop_shadowOn:boolean = false;
  opacityOn:boolean = false;
  sepiaOn:boolean = false;

  
  constructor(private previewService: PreviewService,private router:Router) {
    
  }


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

  grayscale(){
    this.grayscaleOn = !this.grayscaleOn;
  }

  saturate(){
    this.saturateOn = !this.saturateOn;
  }

  contrast(){
    this.contrastOn = !this.contrastOn;
  }

  blur(){
    this.blurOn = !this.blurOn;
  }
  brightness(){
    this.brightnessOn = !this.brightnessOn;
  }
  hue_rotate(){
    this.hue_rotateOn = !this.hue_rotateOn
  }
  invert(){
    this.invertOn = !this.invertOn;
  }
  drop_shadow(){
    this.drop_shadowOn = !this.drop_shadowOn;
  }
  opacity(){
    this.opacityOn = !this.opacityOn;
  }
  sepia(){
    this.sepiaOn = !this.sepiaOn;
  }

}
