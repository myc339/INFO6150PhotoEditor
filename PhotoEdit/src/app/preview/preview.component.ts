import { Component, OnInit, OnDestroy } from "@angular/core";
import { PreviewService } from "../preview.service";
import { ImagesInfo } from "../ImagesInfo";
import { LoadcloudimageService } from "../loadcloudimage.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"]
})
export class PreviewComponent implements OnInit, OnDestroy {
  ImagesInfo: ImagesInfo = new ImagesInfo();
  private paramsSubscription: Subscription;
  Img: any;
  constructor(private previewService: PreviewService) {
    
  }

  ngOnInit() {
    //console.log(this.previewService.ImagesInfo);
    this.ImagesInfo=this.previewService.ImagesInfo;
    this.paramsSubscription = this.previewService.getImg.subscribe(data => {    
      this.ImagesInfo = data;
    });
  }
  confirm()
  {
    this.previewService.ImagesInfo=this.ImagesInfo;
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
