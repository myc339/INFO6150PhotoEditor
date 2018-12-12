
import { Component, OnInit,ViewChild,ElementRef, Inject } from '@angular/core';
import {PreviewService} from '../preview.service';
import { ImagesInfo } from "../ImagesInfo";
import * as html2canvas from "html2canvas";
import { LoadcloudimageService } from "../loadcloudimage.service";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { AngularCropperjsComponent } from 'angular-cropperjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  imageUrl = null;
  croppedImage = null;
  @ViewChild(AngularCropperjsComponent) angularCropper: AngularCropperjsComponent;
  config = Object.assign({
    checkCrossOrigin: false,
    zoomable: true,
    zoom: function(value) {
      this.zoomCallback(value);
    }.bind(this)
  });

  // slider values to zoom image
  sliderValue = 0;
  preValue = 0;

  @ViewChild('myCanvas') myCanvas:ElementRef;
  context:CanvasRenderingContext2D;
  ImagesInfo: ImagesInfo = new ImagesInfo();
  private paramsSubscription: Subscription;
  Img: any;
  
  canvasImg: any;
  constructor(private previewService: PreviewService,private router:Router, public dialog: MatDialog) {
    
  }

  ngOnInit() {
    
    console.log(this.previewService.ImagesInfo);
    this.ImagesInfo=this.previewService.ImagesInfo;
    this.imageUrl = this.ImagesInfo.localImg;
    

    
  }
  reset() {
    this.imageUrl = null;
    this.croppedImage = null;
    this.sliderValue = 0;
    this.preValue = 0;
  }
  /**
   * Zoom in action when click button "+"
   */
  zoomIn() {
    this.angularCropper.cropper.zoom(0.1);
  }

  /**
   * Zoom out action when click button "-"
   */
  zoomOut() {
    this.angularCropper.cropper.zoom(-0.1);
  }

  /**
   * On change value of slider
   */
  onChange() {
    this.angularCropper.cropper.zoom((this.sliderValue - this.preValue)/100);
  }

  /**
   * Action callback when have zoom image
   * @param value zoom value
   */
  zoomCallback(value) {
    var oldRatio = value.detail.oldRatio;
    var newRatio = value.detail.ratio;

    if (this.preValue === this.sliderValue) {
      this.sliderValue = this.preValue + Math.floor((newRatio - oldRatio) * 100);
    }
    this.preValue = this.sliderValue;
  }

  private draw() {
    this.context.beginPath();
    this.context.moveTo(0,0);
    this.context.lineTo(300,150);
    this.context.stroke();
  }
  /**
   * show dialog when click button "crop"
   */
  cropEvent() {
    //this.croppedImage = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
    // let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //   width: '400px',
    //   data: { imageData:  this.angularCropper.cropper.getCroppedCanvas().toDataURL()}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
    console.log(this.angularCropper.cropper.getCroppedCanvas().toDataURL());
  }

  

  goToConfirm(){
    this.ImagesInfo.localImg = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
    this.previewService.ImagesInfo=this.ImagesInfo;
    this.router.navigate(['/confirm']);
  }
  storeAsCanvas(img): any {
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
      this.canvasImg = canvas.toDataURL("image/png");
    });
    console.log(this.canvasImg)
    // this.uploadFile(this.canvasImg);
    // this.downloadFile(new Date(), this.canvasImg);
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  croppedImage = null;

  // constructor for dialog
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  /**
   * close dialog when click outside of it
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}