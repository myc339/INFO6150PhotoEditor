import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Images } from "../Images";
import { ImagesService } from "../images.service";
import { PreviewService } from "../preview.service";
import { DomSanitizer } from "@angular/platform-browser";
import { LoadcloudimageService } from "../loadcloudimage.service";
import { ImagesInfo } from "../ImagesInfo";
@Component({
  selector: "app-pool",
  templateUrl: "./pool.component.html",
  styleUrls: ["./pool.component.scss"]
})
export class PoolComponent implements OnInit {
  @ViewChild("userPhoto") userPhoto: ElementRef;
  images: Images;
  width: Number;
  height: Number;
  ImagesInfo: ImagesInfo = new ImagesInfo();

  constructor(
    private imageService: ImagesService,
    private previewService: PreviewService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}
  // necessary for showing image avoid unsafe error
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  //show all  image on cloud server
  ngOnInit() {
    this.imageService.RetrieveAllImage().subscribe(images => {
      this.images = images;
      //console.log(this.images);
    });
  }
  //select img by click image on page
  preview($event) {
    this.ImagesInfo.cloudImg = $event.target.src;
    // this.ImagesInfo.localImg =
    //   "https://myimagebank.oss-us-west-1.aliyuncs.com/1.jpeg";
    console.log(this.ImagesInfo);
    this.previewService.ImagesInfo=this.ImagesInfo;
    //this.previewService.getImg.emit(this.ImagesInfo);
    // this.router.navigate(['preview']);
    this.navigate();
  }

  //updalod img from btn
  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e: any) {
        // var image = new Image();
        this.ImagesInfo.localImg = e.target.result;
        console.log(this.ImagesInfo)
        //this.previewService.ImagesInfo=this.ImagesInfo;
        this.previewService.getImg.emit(this.ImagesInfo);
        // image.src = e.target.result;
        // image.onload=()=>{
        // }
      }.bind(this);
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    this.clearSelectedPhoto();
    this.router.navigate(["preview"]);
  }

  clearSelectedPhoto() {
    // console.log(this.userPhoto.nativeElement.files);
    this.userPhoto.nativeElement.value = "";
    // console.log(this.userPhoto.nativeElement.files);
  }
  navigate() {
    this.router.navigate(["preview"]);
  }

  onLoadMoreInfo() {}
}
