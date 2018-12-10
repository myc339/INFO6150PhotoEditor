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
  constructor(private imageservice:ImagesService) { }

  ngOnInit() {
    // this.imageservice.retriveAllImage().subscribe()
    // {

    // }
  }

}
