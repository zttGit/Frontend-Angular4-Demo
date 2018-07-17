import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { PhotoRowComponent } from './components/photo-row/photo-row.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { MyAlbumComponent } from './components/my-album/my-album.component';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { ImageCommentsComponent } from './components/image-comments/image-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    PhotoListComponent,
    SidePanelComponent,
    PhotoRowComponent,
    LoginComponent,
    RegisterComponent,
    MyAlbumComponent,
    AddPhotoComponent,
    ImageDetailComponent,
    ImageCommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
