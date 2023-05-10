import { Component } from '@angular/core';
import { Post } from 'src/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  post:Post = {id: '', title:'', content:'', media:'', postUser:'', postSub:''};
}
