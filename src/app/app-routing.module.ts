import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {LoginMainPageComponent} from "./components/login-main-page/login-main-page.component";
import {PostComponent} from "./components/post/post.component";
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { HomeComponent } from './components/home/home.component';
import {RegisterComponent} from "./components/register/register.component";
import { ProfileComponent } from './components/profile/profile.component';
import { ExpenseGuard } from './expense.guard';
import {AddSubbreddotComponent} from "./components/add-subbreddot/add-subbreddot.component";
import {SubreddotComponent} from "./components/subreddot/subreddot.component";
import { AddPostComponent } from './components/add-post/add-post.component';

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
    canActivate: [ExpenseGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'addSubreddot',
    component: AddSubbreddotComponent
  },
  {
    path: 'subreddot/:id',
    component: SubreddotComponent,
  },
  {
    path: 'addPost/:id',
    component: AddPostComponent,
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
