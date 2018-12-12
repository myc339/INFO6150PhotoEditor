import { Component, OnInit, OnDestroy,ViewChild,ElementRef } from "@angular/core";
import { PreviewService } from "../preview.service";
import { ImagesInfo } from "../ImagesInfo";
import { LoadcloudimageService } from "../loadcloudimage.service";
import { Subscription } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"]
})
export class PreviewComponent implements OnInit, OnDestroy {
  ImagesInfo: ImagesInfo = new ImagesInfo();
  private paramsSubscription: Subscription;
  Img: any;
  @ViewChild("Mycanvas") Mycanvas: ElementRef;
  private context: HTMLCanvasElement;
  constructor(private previewService: PreviewService,private sanitizer: DomSanitizer) {   
  }

  ngOnInit() {
    this.ImagesInfo=this.previewService.ImagesInfo;
    this.paramsSubscription = this.previewService.getImg.subscribe(data => {    
      this.ImagesInfo = data;
    });
    console.log(this.ImagesInfo);
  }
  
  confirm()
  {
// var canvas=document.createElement("canvas");
// let context = canvas.getContext('2d');
//  let image =new Image();
//  image.crossOrigin="Anonymous";
//  image.src = "https://myimagebank.oss-us-west-1.aliyuncs.com/1.jpeg"+"?timeStamp="+new Date();
//  image.onload=function()
//  {  

//    context.drawImage(image,0,0);
   
//  }
    this.previewService.ImagesInfo=this.ImagesInfo;
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
