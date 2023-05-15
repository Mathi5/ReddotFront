import { Component } from '@angular/core';
import { Post } from 'src/models/post.model';
import { Subreddot } from 'src/models/subreddot.model';
import { PostServiceService } from 'src/services/post-service.service';
import { SubReddotService } from 'src/services/sub-reddot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts?:Array<Post>;
  featuredSubs?:Array<Subreddot>;
  sort: string = 'date';

  constructor(
    private postService:PostServiceService,
    private subReddotService:SubReddotService,
    ) {

  }

  async ngOnInit(): Promise<void> {
    // this.postService.getPosts().subscribe(res => {
    //   this.posts = res as Array<Post>;
    // });
    this.postService.getPostsByDate().subscribe(res => {
      this.posts = res as Array<Post>;
    });
    this.subReddotService.getFeaturedSubReddots().subscribe(res => {
      this.featuredSubs = res as Array<Subreddot>;
      console.log(this.featuredSubs);
    });
  }

  async switchSort() {
    console.log('switch');
    if (this.sort == 'date') {
      this.postService.getPostsByPopularity().subscribe(res => {
        this.posts = res as Array<Post>;
        this.sort = 'popularity';
      });
    } else {
      this.postService.getPostsByDate().subscribe(res => {
        this.posts = res as Array<Post>;
        this.sort = 'date';
      });
    }
  }
}
