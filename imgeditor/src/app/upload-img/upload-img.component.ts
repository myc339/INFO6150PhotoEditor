// import { Component, OnInit } from '@angular/core';
import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { DispalyComponent } from '../dispaly/dispaly.component';
import { from } from 'rxjs';

// import { AngularCropperjsComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit{

  constructor() { }

  ngOnInit() {
  }
  // cropperjs setting
  imageUrl = null;
  // croppedImage = null;
  // //@ViewChild(AngularCropperjsComponent) angularCropper: AngularCropperjsComponent;
  // config = Object.assign({
  //   checkCrossOrigin: false,
  //   zoomable: true,
  //   zoom: function(value) {
  //     this.zoomCallback(value);
  //   }.bind(this)
  // });

  // slider values to zoom image
  // sliderValue = 0;
  // preValue = 0;
  /**
   * Reset all data for new image
   */
  reset() {
    this.imageUrl = null;
    // this.croppedImage = null;
    // this.sliderValue = 0;
    // this.preValue = 0;
  }
  /**
   * 
   * @param fileInput data file when select new image
   */
  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      this.reset();
      reader.onload = function (e : any) {
          //$('#preview').attr('src', e.target.result);
          // console.log(e.target.result);
          this.imageUrl = e.target.result;
      }.bind(this);

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
