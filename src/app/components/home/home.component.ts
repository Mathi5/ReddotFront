import { Component } from '@angular/core';
import { Post } from 'src/models/post.model';
import { PostServiceService } from 'src/services/post-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts?:Array<Post>;
  constructor(private postService:PostServiceService) {

  }

  async ngOnInit(): Promise<void> {
    this.postService.getPosts().subscribe(res => {
      this.posts = res as Array<Post>;
    });
  }
}
