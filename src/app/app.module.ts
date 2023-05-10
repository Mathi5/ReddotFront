import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import {HttpClientModule} from "@angular/common/http";

import { PostServiceService } from '../services/post-service.service'
import { SubReddotService } from '../services/sub-reddot.service';
import { LoginMainPageComponent } from './components/login-main-page/login-main-page.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    TopBarComponent,
    FooterComponent,
    LoginMainPageComponent,

    CommentComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    RouterLink,
    ReactiveFormsModule,

  ],
  providers: [
    PostServiceService,
    SubReddotService,
  ],
  bootstrap: [
    AppComponent,
    TopBarComponent,
    FooterComponent,
    PostComponent,
    LoginMainPageComponent,
  ]
})
export class AppModule { }
