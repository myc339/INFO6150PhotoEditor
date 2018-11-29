import { ImageInfo } from './../imageInfo';
import { GetImageService } from './../get-image.service';
// import { Component, OnInit } from '@angular/core';
import { Component, ViewChild, Inject, OnInit, ElementRef } from '@angular/core';
import { DispalyComponent } from '../dispaly/dispaly.component';
import { from } from 'rxjs';

// import { AngularCropperjsComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit{



  constructor(private service: GetImageService) { 
  }


  ngOnInit() {
    
  }
  // cropperjs setting

  imageInfo:ImageInfo = new ImageInfo();
  // croppedImage = null;
  // //@ViewChild(AngularCropperjsComponent) angularCropper: AngularCropperjsComponent;
  // config = Object.assign({
  //   checkCrossOrigin: false,
  //   zoomable: true,
  //   zoom: function(value) {
  //     this.zoomCallback(value);
  //   }.bind(this)
  // });

  reset() {
    //this.imageInfo.image = null;
  }
  /**
   * 
   * @param fileInput data file when select new image
   */
  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      //this.reset();
      reader.onload = function (e : any) {
          //$('#preview').attr('src', e.target.result);
          // console.log(e.target.result);
          console.log(this.imageInfo);
          this.imageInfo.image = e.target.result;

          var image = new Image();
          image.src = e.target.result;
          console.log(image.width);
          image.onload=()=>{
            console.log(image.width);
            
            this.imageInfo.width=image.width;
            this.imageInfo.height=image.height;
          }
          

          this.service.getImage.emit(this.imageInfo);

      }.bind(this);
      
      
      reader.readAsDataURL(fileInput.target.files[0]);
     
    }
  }
}
