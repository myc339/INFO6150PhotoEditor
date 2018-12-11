import { Component, OnInit } from '@angular/core';
import { Images } from '../Images';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {
  images:Images;
  width:Number=200;
  height:Number=500;
  constructor(private imageservice:ImagesService) { }

  ngOnInit() {
    this.imageservice.retriveAllImage().subscribe((images)=>{
      this.images=images;
      console.log(this.images);
    })
  }
  priview($event){
    console.log($event.target.src);
    
    this.getUrlBase64($event.target.src,'png',function (base64) {
      console.log(base64);//base64编码值
  });
  }
   getUrlBase64(url, ext, callback) {
    var canvas = document.createElement("canvas");   //创建canvas DOM元素
    var ctx = canvas.getContext("2d");
    var img = new Image;
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = function () {
        canvas.height = 60; //指定画板的高度,自定义
        canvas.width = 85; //指定画板的宽度，自定义
        ctx.drawImage(img, 0, 0, 60, 85); //参数可自定义
        var dataURL = canvas.toDataURL("image/" + ext);
        callback.call(this, dataURL); //回掉函数获取Base64编码
        canvas = null;
    };
}


}
