
import { Component, OnInit,ViewChild,ElementRef, Inject } from '@angular/core';
import {PreviewService} from '../preview.service';
import { ImagesInfo } from "../ImagesInfo";

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
  left:Number=20;
  top:Number=20;
  grayscaleOn:boolean = false;
  contrastOn:boolean = false;
  blurOn:boolean = false;
  saturateOn:boolean = false;
  brightnessOn:boolean = false;
  hue_rotateOn:boolean = false;
  invertOn:boolean = false;
  drop_shadowOn:boolean = false;
  opacityOn:boolean = false;
  sepiaOn:boolean = false;

  
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

  grayscale(){
    this.grayscaleOn = !this.grayscaleOn;
  }

  saturate(){
    this.saturateOn = !this.saturateOn;
  }

  contrast(){
    this.contrastOn = !this.contrastOn;
  }

  blur(){
    this.blurOn = !this.blurOn;
  }
  brightness(){
    this.brightnessOn = !this.brightnessOn;
  }
  hue_rotate(){
    this.hue_rotateOn = !this.hue_rotateOn
  }
  invert(){
    this.invertOn = !this.invertOn;
  }
  drop_shadow(){
    this.drop_shadowOn = !this.drop_shadowOn;
  }
  opacity(){
    this.opacityOn = !this.opacityOn;
  }
  sepia(){
    this.sepiaOn = !this.sepiaOn;
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