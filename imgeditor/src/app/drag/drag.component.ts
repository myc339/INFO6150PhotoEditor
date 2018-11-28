import { Component, OnInit } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss']
})
export class DragComponent implements OnInit {

  constructor(private  el: ElementRef,private renderer: Renderer2) { }

  ngOnInit() {
  }

  dragImage(){
    let imagArea = document.getElementsByClassName("imagArea")[0];
    console.log(imagArea);
    this.renderer.listen(imagArea, "mousedown", this.editImgArea);
  }

  editImgArea(ev){
    var selectedArea = document.getElementsByClassName("imagArea")[0];
    selectedArea.getAttribute("offsetLeft");
    console.log("this is: "+selectedArea.getAttribute("offsetLeft"));
    var oevent = ev || event;
    //prevent the default event
    oevent.preventDefault();
    //distance between clicking position and area's border
    var distanceX = oevent.clientX - selectedArea.offsetLeft;
    var distanceY = oevent.clientY - selectedArea.offsetTop;
    //set the inline style to help change area's size
    selectedArea.style.width = selectedArea.style.width || selectedArea.offsetWidth;
    selectedArea.style.height = selectedArea.style.height || selectedArea.offsetHeight;
    var widthWhenClick = parseInt(selectedArea.style.width);
    var heigjtWhenClick = parseInt(selectedArea.style.height);
    var xWhenClick = oevent.clientX;
    var yWhenClick = oevent.clientY;

    //clink on left&top
    if((distanceX<10&&distanceY<10)){
        document.onmousemove = function(ev){
            var oevent = ev || event;
            selectedArea.style.left = oevent.clientX - distanceX + 'px';
            selectedArea.style.top = oevent.clientY - distanceY + 'px';
            selectedArea.style.width = (widthWhenClick - (oevent.clientX - xWhenClick)) + 'px';
            selectedArea.style.height = (heigjtWhenClick - (oevent.clientY - yWhenClick)) + 'px'; 
        }
    }
    //clink on left&bottom
    else if(distanceX<10&&distanceY>(selectedArea.offsetHeight-10)){
        document.onmousemove = function(ev){
            var oevent = ev || event;
            selectedArea.style.left = oevent.clientX - distanceX + 'px';
            selectedArea.style.width = (widthWhenClick - (oevent.clientX - xWhenClick)) + 'px';
            selectedArea.style.height = (heigjtWhenClick + (oevent.clientY - yWhenClick)) + 'px'; 
        }
    }
    //clink on right&top
    else if(distanceX>(selectedArea.offsetWidth-10)&&distanceY<10){
        document.onmousemove = function(ev){
            var oevent = ev || event;
            selectedArea.style.top = oevent.clientY - distanceY + 'px';
            selectedArea.style.width = (widthWhenClick + (oevent.clientX - xWhenClick)) + 'px';
            selectedArea.style.height = (heigjtWhenClick - (oevent.clientY - yWhenClick)) + 'px'; 
        }
    }
    //clink on right&bottom
    else if(distanceX>(selectedArea.offsetWidth-10)&&distanceY>(selectedArea.offsetHeight-10)){
        document.onmousemove = function(ev){
        var oevent = ev || event;
        selectedArea.style.width = (widthWhenClick + (oevent.clientX - xWhenClick)) + 'px';
        selectedArea.style.height = (heigjtWhenClick + (oevent.clientY - yWhenClick)) + 'px';
        }
    }
    //click on border
    else if(distanceX<10||distanceX>(selectedArea.offsetWidth-10)||distanceY<10||distanceY>(selectedArea.offsetHeight-10)){
        document.onmousemove = function(ev){
            console.log('in postion');
            var oevent = ev || event;
            selectedArea.style.left = oevent.clientX - distanceX + 'px';
            selectedArea.style.top = oevent.clientY - distanceY + 'px';
        }
    }

    document.onmouseup = function(){
        document.onmousemove = null;
        document.onmouseup = null;
        selectedArea.style.border = "white";
    };
  };
}

