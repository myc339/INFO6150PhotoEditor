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
    // this.convertToDataURLviaCanvas(this.ImagesInfo.cloudImg, "image/jpeg")
    // .then( base64Img => {
    //    //do whatever you need here, with the base64 data
    // })
  }
  
  confirm()
  {       //get blob data from cloud server 
    var request = new XMLHttpRequest();
   let myurl='https://myimagebank.oss-us-west-1.aliyuncs.com/';
request.open('GET', myurl+'1.jpeg', true);
request.responseType = 'blob';
request.onload = function() {
    var reader = new FileReader();
    reader.readAsDataURL(request.response);
    reader.onload = (e) => {
      
        console.log('DataURL:', reader.result);
      
    };
    
};
request.send();
    //console.log(this.previewService.ImagesInfo.localImg)
    if(this.previewService.ImagesInfo.localImg===undefined&&
      this.previewService.ImagesInfo.cloudImg!==undefined)
      { 
        
      }

    this.previewService.ImagesInfo=this.ImagesInfo;
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
  downloadFile(filename, content) {
    // console.log(content);
    var base64Img = content;
    var oA = document.createElement("a");
    oA.href = window.URL.createObjectURL(content);
    oA.download = filename;
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    oA.dispatchEvent(event);
  }
//   getBlob(url) {
//     return new Promise(resolve => {
//         const xhr = new XMLHttpRequest();

//         xhr.open('GET', url, true);
//         xhr.responseType = 'blob';
//         xhr.onload = () => {
//             if (xhr.status === 200) {
//                 resolve(xhr.response);
//             }
//         };

//         xhr.send();
//     });
// }
// download(url, filename) {
//   this.getBlob(url).then(blob => {
//     this.downloadFile(filename,blob);
//   });
// }
  
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
