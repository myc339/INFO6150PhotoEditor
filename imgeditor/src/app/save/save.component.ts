import { Component, OnInit, ElementRef } from '@angular/core';
import * as html2canvas from 'html2canvas';
@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {
  canvasImg:any;

  constructor(private el:ElementRef) { }

  ngOnInit() {
  }
  SaveImg()
  { 
        this.saveImgLocal();
  }




  
  saveImgLocal() {
    var shareContent = document.getElementById("display");//需要截图的包裹的（原生的）DOM 对象
        var width = shareContent.offsetWidth; //获取dom 宽度
        var height = shareContent.offsetHeight; //获取dom 高度
        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = 1; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
        var opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            logging: true, //日志开关
            width: width, //dom 原始宽度
            height: height //dom 原始高度
        };
        html2canvas(shareContent, opts).then(canvas => {
            this.canvasImg = canvas.toDataURL("image/png");
        
        });
        
    this.downloadFile(new Date(), this.canvasImg);
  }

  downloadFile(filename, content) {
    var base64Img = content;
    var oA = document.createElement('a');
    oA.href = base64Img;
    oA.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    oA.dispatchEvent(event);
  }
  
}
