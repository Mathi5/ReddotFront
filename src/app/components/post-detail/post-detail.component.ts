import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/models/post.model';
import { PostServiceService } from 'src/services/post-service.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {

  post?: Post;
  id = '';

  constructor(private route: ActivatedRoute, private postService: PostServiceService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(res => {
      this.id = res.get('id') ?? '';
      console.log(this.id);
    });

    this.postService.getPostById(this.id).subscribe(res => {
      this.post = res as Post;
      console.log("the post");
      console.log(this.post);
    });
  }
}
