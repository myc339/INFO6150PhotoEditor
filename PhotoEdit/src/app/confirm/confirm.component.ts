import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import * as html2canvas from "html2canvas";
import * as OSS from "ali-oss";
@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.scss"]
})
export class ConfirmComponent implements OnInit {
  canvasImg: any;
  client = new OSS({
    accessKeyId: "LTAIyUXGzl6aymVM",
    accessKeySecret: "obLupIX7fk2yvVDY320QSH46CKH8JU",
    bucket: "myimagebank",
    region: "oss-us-west-1"
  });
  constructor(private router:Router) {}

  ngOnInit() {
    this.storeAsCanvas();
  }
  send()
  {
    alert("Send successfully!");

  }
  download() {
    this.downloadFile(new Date(), this.canvasImg);
  }
  upload() {
    this.uploadFile(this.canvasImg);
  }

  uploadFile(file) {
    let suffix = ".jpeg";
    let obj = new Date().getTime();
    let storeAs = obj + suffix;
    this.client
      .multipartUpload(storeAs, file)
      .then(result => {})
      .catch(err => {});
  }

  storeAsCanvas(): any {
    var shareContent = document.getElementById("display"); //the object dom need save
    var width = shareContent.offsetWidth; //get dom width
    var height = shareContent.offsetHeight; //dom height
    var canvas = document.createElement("canvas"); //create canvas node
    var scale = 1; //resize the picture
    canvas.width = width * scale; // define canvas width * scale
    canvas.height = height * scale; //define canvas height *scale
    canvas.getContext("2d").scale(scale, scale); //get context,set scale
    var opts = {
      scale: scale, // add scale parameter
      canvas: canvas, // canvas define
      logging: true, // use log
      width: width, //dom  original width
      height: height //dom original height
    };
    html2canvas(shareContent, opts).then(canvas => {
      this.canvasImg = canvas.toDataURL("image/jpeg");
    });
    // this.uploadFile(this.canvasImg);
    // this.downloadFile(new Date(), this.canvasImg);
  }

  downloadFile(filename, content) {
    console.log(content);
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