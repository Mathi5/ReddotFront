import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    TopBarComponent,
    FooterComponent,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    TopBarComponent,
    FooterComponent
  ]
})
export class AppModule { }
