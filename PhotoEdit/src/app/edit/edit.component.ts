import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {PreviewService} from '../preview.service';
import { ImagesInfo } from "../ImagesInfo";
import { LoadcloudimageService } from "../loadcloudimage.service";
import { Subscription } from "rxjs";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild('checkCode') canvasRef: ElementRef;
  @ViewChild('myCanvas') myCanvas:ElementRef;
  context:CanvasRenderingContext2D;
  ImagesInfo: ImagesInfo = new ImagesInfo();
  private paramsSubscription: Subscription;
  Img: any;
  left:Number=20;
  top:Number=20;
  public code: any; // 验证码
  constructor(private previewService: PreviewService) {
    
  }
  ngOnInit() {
    console.log(this.previewService.ImagesInfo);
    this.ImagesInfo=this.previewService.ImagesInfo;
    this.clickChange();
    let canvas = document.getElementById("canvas"),   //获取Canvas画布对象
        context = canvas.getContext('2d');  //获取2D上下文对象，大多数Canvas API均为此对象方法
    var image = new Image();  //定义一个图片对象
    image.src = 'imgs/img.jpg';


    
  }
  
  // create random checkcode
public createCode() {
  this.code = '';
  const codeLength = 4;  // code length
  const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // 所有候选组成验证码的字符，当然也可以用中文的
  for (let i = 0; i < codeLength; i++) { // loop
    const index = Math.floor(Math.random() * 52); // generate random index（0~51）
    this.code += random[index]; // get according character and add into verifycode
  }
  return this.code;
}

/*generate line x position value*/
public lineX() {
  const ranLineX = Math.floor(Math.random() * 80);
  return ranLineX;
}

/*generate line y position value*/
public lineY() {
  const ranLineY = Math.floor(Math.random() * 35);
  return ranLineY;
}

// generate random color
public rgb() {
  // 因为在angular4里面不能使用arguments，所以换了一种方法。
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

public clickChange() {
  // * 注意：这里跟js不一样！！！
  const cxt: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
  cxt.fillStyle = '#fff';
  cxt.fillRect(0, 0, 80, 35);

  /*generate 20 lines*/
  for (let j = 0; j < 20; j++) {
    cxt.strokeStyle = this.rgb();
    cxt.beginPath();    // without beginPath, every time generate verify code lines number will added 
    cxt.moveTo(this.lineX(), this.lineY());
    cxt.lineTo(this.lineX(), this.lineY());
    cxt.lineWidth = 0.5;
    cxt.closePath();
    cxt.stroke();
  }

  cxt.fillStyle = '#6271a9';
  cxt.font = 'bold 20px Arial';
  cxt.fillText(this.createCode(), 15, 25);   // 把rand()生成的随机数文本填充到canvas中
  console.log(this.code);
}

  

}
