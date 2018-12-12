import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { PreviewService } from '../preview.service';
import { ImagesInfo } from "../ImagesInfo";
import * as html2canvas from "html2canvas";
import { LoadcloudimageService } from "../loadcloudimage.service";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { AngularCropperjsComponent } from 'angular-cropperjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-re-edit',
  templateUrl: './re-edit.component.html',
  styleUrls: ['./re-edit.component.scss']
})
export class ReEditComponent implements OnInit {

  imageUrl = null;

  ImagesInfo: ImagesInfo = new ImagesInfo();

  //the condition of inactive editing
  grayscaleOn: boolean = false;
  contrastOn: boolean = false;
  blurOn: boolean = false;
  saturateOn: boolean = false;
  brightnessOn: boolean = false;
  hue_rotateOn: boolean = false;
  invertOn: boolean = false;
  drop_shadowOn: boolean = false;
  opacityOn: boolean = false;
  sepiaOn: boolean = false;
  //the value of style
  grayscaleValue: number = 10;
  contrastValue: number = 0;
  blurValue: number = 0;
  saturateValue: number = 0;
  brightnessValue: number = 0;
  hue_rotateValue: number = 0;
  invertValue: number = 0;
  drop_shadowValue: number = 0;
  opacityValue: number = 0;
  sepiaValue: number = 0;
  tempWidth: string;
  tempHeight: string;

  //the add string
  text: string;
  //edit style element
  newCanvas: HTMLCanvasElement;
  newImage: HTMLImageElement;
  ctx: any;
  pixels: any;
  pixeldata: any;
  pixelsNoText: any;


  constructor(private previewService: PreviewService,
    private router: Router,
    public dialog: MatDialog,
    private el: ElementRef,
    private renderer2: Renderer2) {

  }

  ngOnInit() {

    console.log(this.previewService.ImagesInfo);
    this.ImagesInfo = this.previewService.ImagesInfo;
    this.imageUrl = this.ImagesInfo.localImg;
    this.getEl();

  }

  goToConfirm() {
    //canvs的值传出
    this.previewService.ImagesInfo.tempImg = this.newCanvas.toDataURL();
    this.previewService.ImagesInfo = this.ImagesInfo;
    this.router.navigate(['/confirm']);
  }

  //Add text
  addText() {
    this
    this.ctx.font = "10px Arial";
    this.ctx.fillText(this.text, 10, 10);
    this.ctx.fillText(this.text, 400, 200);
    this.ctx.fillText(this.text, 700, 400);
  }
  //photo edit function
  getEl() {
    console.log("in getEl");
    this.newCanvas = this.el.nativeElement.querySelector('.newCanvas');
    console.log("in getEl" + this.newCanvas);
    this.newImage = this.el.nativeElement.querySelector('.newImage');
    console.log("in getEl" + this.newImage);
    //this.renderer2.setStyle(this.newImage, "display", "none");
    console.log(this.newImage);
    if (this.previewService.ImagesInfo.cloudImg) {
      this.newImage.src = this.previewService.ImagesInfo.cloudImg;
    }
    else {
      this.newImage.src = this.previewService.ImagesInfo.localImg;
    }

    console.log(this.newImage.src);
    

    this.editStyle();

  }

  editStyle() {
    console.log(this.newImage);
    console.log(this.newCanvas.toDataURL());
    this.newImage.onload = () => {
      this.ctx = this.newCanvas.getContext("2d");
      // this.tempWidth = window.getComputedStyle(this.el.nativeElement.querySelector(".newImage")).width;
      // this.tempHeight = window.getComputedStyle(this.el.nativeElement.querySelector(".newImage")).height;
      //console.log(this.tempHeight+"and"+this.tempWidth);
      this.ctx.drawImage(this.newImage, 0, 0,this.newImage.width,this.newImage.height);
      this.pixels = this.ctx.getImageData(0, 0,this.newImage.width,this.newImage.height);
      this.pixeldata = this.pixels.data;
      this.pixelsNoText = this.ctx.getImageData(0, 0,this.newImage.width,this.newImage.height);
    }
    
  }

  saveAsPNG(canvas) {
    return canvas.toDataURL("image/png");
  }
  downLoad(url) {
    var oA = document.createElement("a");
    oA.download = '';// 设置下载的文件名，默认是'下载'
    oA.href = url;
    document.body.appendChild(oA);
    oA.click();
    oA.remove(); // 下载之后把创建的元素删除

  }


  grayscale() {
    this.grayscaleOn = !this.grayscaleOn;
    this.contrastOn = false;
    this.blurOn = false;
    this.saturateOn = false;
    this.brightnessOn = false;
    this.hue_rotateOn = false;
    this.invertOn = false;
    this.drop_shadowOn = false;
    this.opacityOn = false;
    this.sepiaOn = false;

    if(this.grayscaleOn){
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
      var gray = parseInt(this.pixels.data[i]) * 0.9 + parseInt(this.pixels.data[i + 1]) * 0.9 + parseInt(this.pixels.data[i + 2]) * 0.11;
      this.pixels.data[i] = gray;
      this.pixels.data[i + 1] = gray;
      this.pixels.data[i + 2] = gray;
    }
    this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
    this.ctx.putImageData(this.pixels, 0, 0);
    }
    else{
      
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixelsNoText, 0, 0);
    }
    

    console.log(this.ctx);
    console.log(this.ctx.font);
    console.log(this.ctx.getImageData);

  }
  // grayscaleAdd() {

  //   if (this.grayscaleValue < 100) {
  //     this.grayscaleValue = this.grayscaleValue + 10;

  //     console.log("addddddd" + this.grayscaleValue);
  //     console.log(this.imageUrl);
  //   }
  // }
  // grayscaleMinus() {
  //   // let num = parseInt(this.grayscalValue);
  //   if (this.grayscaleValue > 0) {
  //     this.grayscaleValue = this.grayscaleValue - 10;
  //   }
  // }

  saturate() {
    this.saturateOn = !this.saturateOn;
    this.grayscaleOn = false;
    this.contrastOn = false;
    this.blurOn = false;
    this.brightnessOn = false;
    this.hue_rotateOn = false;
    this.invertOn = false;
    this.drop_shadowOn = false;
    this.opacityOn = false;
    this.sepiaOn = false;
  }
  // saturateAdd() {
  //   if (this.saturateValue < 1) {
  //     this.saturateValue = this.saturateValue + 0.1;
  //   }
  // }
  // saturateMinus() {
  //   if (this.saturateValue > 0) {
  //     this.saturateValue = this.saturateValue - 0.1;
  //   }
  // }

  contrast() {
    this.contrastOn = !this.contrastOn;
    this.grayscaleOn = false;
    this.blurOn = false;
    this.saturateOn = false;
    this.brightnessOn = false;
    this.hue_rotateOn = false;
    this.invertOn = false;
    this.drop_shadowOn = false;
    this.opacityOn = false;
    this.sepiaOn = false;
  }
  // contrastAdd() {
  //   if (this.contrastValue < 1) {
  //     this.contrastValue = this.contrastValue + 0.1;
  //   }
  // }
  // contrastMinus() {
  //   if (this.contrastValue > 0) {
  //     this.contrastValue = this.contrastValue - 0.1;
  //   }
  // }

  blur() {
    this.blurOn = !this.blurOn;
    this.grayscaleOn = false;
    this.contrastOn = false;
    this.saturateOn = false;
    this.brightnessOn = false;
    this.hue_rotateOn = false;
    this.invertOn = false;
    this.drop_shadowOn = false;
    this.opacityOn = false;
    this.sepiaOn = false;
  }
  // blurAdd() {
  //   if (this.blurValue < 1) {
  //     this.blurValue = this.blurValue + 0.1;
  //   }
  // }
  // blurMinus() {
  //   if (this.blurValue > 0) {
  //     this.blurValue = this.blurValue - 0.1;
  //   }
  // }
  brightness() {
    this.brightnessOn = !this.brightnessOn;
    this.grayscaleOn = false;
    this.contrastOn = false;
    this.blurOn = false;
    this.saturateOn = false;
    this.hue_rotateOn = false;
    this.invertOn = false;
    this.drop_shadowOn = false;
    this.opacityOn = false;
    this.sepiaOn = false;
  }
  // brightnessAdd() {
  //   if (this.brightnessValue < 1) {
  //     this.brightnessValue = this.brightnessValue + 0.1;
  //   }
  // }
  // brightnessMinus() {
  //   if (this.brightnessValue > 0) {
  //     this.brightnessValue = this.brightnessValue - 0.1;
  //   }
  // }
  hue_rotate() {
    this.hue_rotateOn = !this.hue_rotateOn;
    if(this.hue_rotateOn){
      for (var i=0;i<this.pixels.data.length;i+=4)
      {
        this.pixels.data[i]=255-this.pixels.data[i];
        this.pixels.data[i+1]=255-this.pixels.data[i+1];
        this.pixels.data[i+2]=255-this.pixels.data[i+2];
        this.pixels.data[i+3]=255;
      }
      this.ctx.putImageData(this.pixels,0,0);
    }
    else{
      
      this.ctx.putImageData(this.pixelsNoText,0,0);
    }
    
  }
  // hue_rotateAdd() {
  //   if (this.hue_rotateValue < 1) {
  //     this.hue_rotateValue = this.hue_rotateValue + 0.1;
  //   }
  // }
  // hue_rotateMinus() {
  //   if (this.hue_rotateValue > 0) {
  //     this.hue_rotateValue = this.hue_rotateValue - 0.1;
  //   }
  // }
  invert() {
    this.invertOn = !this.invertOn;
    this.grayscaleOn = false;
    this.contrastOn = false;
    this.blurOn = false;
    this.saturateOn = false;
    this.brightnessOn = false;
    this.hue_rotateOn = false;
    this.drop_shadowOn = false;
    this.opacityOn = false;
    this.sepiaOn = false;
  }
  // invertAdd() {
  //   if (this.invertValue < 1) {
  //     this.invertValue = this.invertValue + 0.1;
  //   }
  // }
  // invertMinus() {
  //   if (this.invertValue > 0) {
  //     this.invertValue = this.invertValue - 0.1;
  //   }
  // }
  drop_shadow() {
    this.drop_shadowOn = !this.drop_shadowOn;
    this.grayscaleOn = false;
    this.contrastOn = false;
    this.blurOn = false;
    this.saturateOn = false;
    this.brightnessOn = false;
    this.hue_rotateOn = false;
    this.invertOn = false;
    this.opacityOn = false;
    this.sepiaOn = false;
  }
  // drop_shadowAdd() {
  //   if (this.drop_shadowValue < 1) {
  //     this.drop_shadowValue = this.drop_shadowValue + 0.1;
  //   }
  // }
  // drop_shadowMinus() {
  //   if (this.drop_shadowValue > 0) {
  //     this.drop_shadowValue = this.drop_shadowValue - 0.1;
  //   }
  // }
  opacity() {
    this.opacityOn = !this.opacityOn;
    this.grayscaleOn = false;
    this.contrastOn = false;
    this.blurOn = false;
    this.saturateOn = false;
    this.brightnessOn = false;
    this.hue_rotateOn = false;
    this.invertOn = false;
    this.drop_shadowOn = false;
    this.sepiaOn = false;
    if(this.opacityOn){
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
      
        this.pixels.data[i + 3] = 125;
      }
      this.ctx.clearRect(0, 0, this.newCanvas.width, this.newCanvas.height);
      this.ctx.putImageData(this.pixels, 0, 0);
    }
    else{
      
      this.ctx.clearRect(0, 0, this.newCanvas.width, this.newCanvas.height);
      this.ctx.putImageData(this.pixelsNoText, 0, 0);
    }
  }
  // opacityAdd() {
  //   if (this.opacityValue < 1) {
  //     this.opacityValue = this.opacityValue + 0.1;
  //   }
  // }
  // opacityMinus() {
  //   if (this.opacityValue > 0) {
  //     this.opacityValue = this.opacityValue - 0.1;
  //   }
  // }
  sepia() {
    this.sepiaOn = !this.sepiaOn;
    this.grayscaleOn = false;
    this.contrastOn = false;
    this.blurOn = false;
    this.saturateOn = false;
    this.brightnessOn = false;
    this.hue_rotateOn = false;
    this.invertOn = false;
    this.drop_shadowOn = false;
    this.opacityOn = false;
  }
  // sepiaAdd() {
  //   if (this.sepiaValue < 1) {
  //     this.sepiaValue = this.sepiaValue + 0.1;
  //   }
  // }
  // sepiaMinus() {
  //   if (this.sepiaValue > 0) {
  //     this.sepiaValue = this.sepiaValue - 0.1;
  //   }
  // }

}
