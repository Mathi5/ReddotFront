import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {LoginMainPageComponent} from "./components/login-main-page/login-main-page.component";
import {PostComponent} from "./components/post/post.component";

const routes: Routes = [
  {
    path: 'home',
    component: AppComponent,
  },
  {
    path: 'login',
    component: LoginMainPageComponent,
  },
  {
    path: 'posts',
    component: PostComponent,
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
