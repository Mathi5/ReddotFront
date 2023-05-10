import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {LoginMainPageComponent} from "./components/login-main-page/login-main-page.component";
import {PostComponent} from "./components/post/post.component";
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginMainPageComponent,
  },
  {
    path: 'posts',
    component: PostComponent,
  },
  {
    path: 'posts/:id',
    component: PostDetailComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
