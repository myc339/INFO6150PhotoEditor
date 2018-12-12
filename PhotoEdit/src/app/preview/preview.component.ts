import { Component, OnInit, OnDestroy } from "@angular/core";
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
  constructor(private previewService: PreviewService,private sanitizer: DomSanitizer) {
    
  }

  ngOnInit() {
    //console.log(this.previewService.ImagesInfo);
    this.ImagesInfo=this.previewService.ImagesInfo;
    this.paramsSubscription = this.previewService.getImg.subscribe(data => {    
      this.ImagesInfo = data;
    });
    console.log(this.ImagesInfo)
    this.convertToDataURLviaCanvas(this.ImagesInfo.cloudImg, "image/jpeg")
    .then( base64Img => {
       //do whatever you need here, with the base64 data
    })
  }
  confirm()
  {
    this.previewService.ImagesInfo=this.ImagesInfo;
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
 

  convertToDataURLviaCanvas(url, outputFormat){
    return new Promise( (resolve, reject) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function(){
        let canvas = <HTMLCanvasElement> document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        //callback(dataURL);
        canvas = null;
        resolve(dataURL); 
        console.log(dataURL);
      };
      img.src = url;
    });
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
