import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { MenuComponent } from './menu-button/menu.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DragComponent } from './drag/drag.component';
import { ScaleComponent } from './scale/scale.component';
import { CutComponent } from './cut/cut.component';
import { RotateComponent } from './rotate/rotate.component';
import { MembershipMenuComponent } from './membership-menu/membership-menu.component';
import { SaveComponent } from './save/save.component';
import { MenubarComponent } from './menubar/menubar.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadImgComponent,
    MenuComponent,
    NavigationComponent,
    DragComponent,
    ScaleComponent,
    CutComponent,
    RotateComponent,
    MembershipMenuComponent,
    SaveComponent,
    MenubarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
