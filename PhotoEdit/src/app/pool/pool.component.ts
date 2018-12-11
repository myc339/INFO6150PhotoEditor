import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Images } from '../Images';
import { ImagesService } from '../images.service';
import { PreviewService } from '../preview.service';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {


  images:Images;

  width:Number;
  height:Number;
  


  constructor(private imageservice:ImagesService, private previewService:PreviewService,private router: Router,
    private sanitizer:DomSanitizer) {
    
   }

   sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

  ngOnInit() {
    this.imageservice.retriveAllImage().subscribe((images)=>{
      this.images=images;
      console.log(this.images);
    })
   
  }
  preview($event){
    console.log($event.target.src);
    this.previewService.getImg.emit($event.target.src);
    this.router.navigate(['preview']);
  }

  
  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      
     
      
      //fileInput.target.files[0]='';
    
      reader.onload = function (e : any) {         
         
          var image = new Image();
          this.previewService.getImg.emit(e.target.result);
          image.src = e.target.result;
          
          image.onload=()=>{
            // this.imageInfo.width=image.width;
            // this.imageInfo.height=image.height;
            
          }
          //this.uploadFile(this.file);
          

      }.bind(this);
      reader.readAsDataURL(fileInput.target.files[0]);
    
    }
    this.router.navigate(['preview']);
  }

  onLoadAddNew(){
   
  }

  onLoadMoreInfo(){
   
  }


}
