import { NgModule } from '@angular/core';
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
import {UserService} from "../services/user.service";
import { CommentComponent } from "./components/comment/comment.component";
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    TopBarComponent,
    FooterComponent,
    LoginMainPageComponent,
    CommentComponent,
     PostDetailComponent,
     HomeComponent,
      ProfileComponent,
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
    UserService,
  ],
  bootstrap: [
    AppComponent,
    TopBarComponent,
    LoginMainPageComponent,
  ]
})
export class AppModule { }
