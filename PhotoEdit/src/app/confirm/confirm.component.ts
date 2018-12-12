import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import * as html2canvas from "html2canvas";
import * as OSS from "ali-oss";

import { Mails } from '../mails';
import { MailserviceService } from '../mailservice.service';

import { ImagesInfo } from "../ImagesInfo";
import {PreviewService} from '../preview.service';
import { ImagesService } from '../images.service';
import { Images } from '../Images';

@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.scss"]
})
export class ConfirmComponent implements OnInit {
  
   pattern:any=/^[0-9A-Za-z]+(\.[a-zA-Z0-9_-]+)@[0-9A-Za-z_]+(\.[a-zA-Z0-9_-]+)+$/g;
  mails:Mails=new Mails();
  canvasImg:any;
  header:string="https://myimagebank.oss-us-west-1.aliyuncs.com/";
 
  Images:Images =new Images();
  client = new OSS({
    accessKeyId: "LTAIyUXGzl6aymVM",
    accessKeySecret: "obLupIX7fk2yvVDY320QSH46CKH8JU",
    bucket: "myimagebank",
    region: "oss-us-west-1"
  });

  imagesInfo: ImagesInfo = new ImagesInfo();
  constructor(private router:Router, private previewService: PreviewService,
    private mailService:MailserviceService,private imageService:ImagesService)
  {
   this.mails.To="";
    this.mails.title="";
    this.mails.content="";
  }


  ngOnInit() {
    
    this.imagesInfo=this.previewService.ImagesInfo;
    console.log(this.imagesInfo);
    this.canvasImg=this.imagesInfo.tempImg;
    console.log(this.canvasImg);
  }
  send()
  { 
    if(!this.mails.To.match(this.pattern))
    {
      alert("invalid mail");
      return ;
    }
    if(this.mails.title == ""){
      alert("Please input your title");
      return;
    }

   let path=this.header+this.uploadFile(this.canvasImg);

    this.mails.content= path;
    console.log(this.mails.content);
    this.mailService.SendMail(this.mails).subscribe((data)=>{
    });

  }
  download() {
    this.downloadFile(new Date(), this.canvasImg);
  }
  upload() {
    
   
    let path=this.header+this.uploadFile(this.canvasImg);
    this.Images.img=path;
    this.imageService.UploadNewImage(this.Images).subscribe(()=>{

    });
  }

  uploadFile(file) {
    let suffix = ".png";
    let obj = new Date().getTime();
    let storeAs = obj + suffix;
    console.log(storeAs);
    console.log(obj);
   file= this.b64toBlob(file);
    this.client
      .multipartUpload(storeAs, file)
      .then(result => {
        console.log(result);
       
      }
        )
      .catch(err => {
        console.log(err);
      });
      return storeAs;
  }
   //dataURItoFile(dataURI, fileName) {
    
  //   var byteString = atob(dataURI.split(',')[1]);
   
  //   var ab = new ArrayBuffer(byteString.length);
  //   var ia = new Uint8Array(ab);
  //   for (var i = 0; i < byteString.length; i++) {
  //    ia[i] = byteString.charCodeAt(i);
  //   }
  //   // return new Blob([ab], { type: 'image/jpeg' });
  //   return new File([ia], fileName, {type: 'image/jpeg', lastModified: Date.now()})
  // }
  b64toBlob(b64Data, contentType='', sliceSize=512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

  

  downloadFile(filename, content) {
     console.log("download");
    var base64Img = content;
    var oA = document.createElement("a");
    oA.href = base64Img;
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

  backToSelect(){
    this.router.navigate(['/pool']);
  }

  backToEdit(){
    this.router.navigate(['/edit']);
  }
}
