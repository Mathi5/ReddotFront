import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SubReddotService} from "../../../services/sub-reddot.service";
import {PostServiceService} from "../../../services/post-service.service";
import {Post} from "../../../models/post.model";
import {Subreddot} from "../../../models/subreddot.model";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-subreddot',
  templateUrl: './subreddot.component.html',
  styleUrls: ['./subreddot.component.css']
})
export class SubreddotComponent implements OnInit {

    subreddotId: string = '';
    subreddot: Subreddot | undefined;
    posts: Array<Post> = [];
    user: User = {} as User;
    faPlus = faPlus;
    isSubscribed: boolean = false;
    isLogged: boolean = false;
    sort: string = 'date';

    constructor(
      private route: ActivatedRoute,
      private subReddotService: SubReddotService,
      private postService: PostServiceService,
      private userService: UserService,
    ) {
      this.subreddotId = this.route.snapshot.params['id'];
      this.isLogged = this.userService.isLogged();
    }

    ngOnInit(): void {
      this.init();
      // this.postService.getPostBySubId(this.subreddotId).subscribe(res => {
      //   this.posts = res as Array<Post>;
      // });
      this.postService.getSubPostsByDate(this.subreddotId).subscribe(res => {
        this.posts = res as Array<Post>;
      });
      this.userService.getUser().subscribe(res => {
        this.user = res as User;
      });
    }

    init() {
      this.subReddotService.getSubReddot(this.subreddotId).subscribe(res => {
        this.subreddot = res as Subreddot;
      });
      this.userService.isSubscribedToSubreddot(this.subreddotId).subscribe(res => {
        this.isSubscribed = res as boolean;
      });
    }

  subscribeToSubreddot() {
      if (this.isSubscribed) {
        this.isSubscribed = false;
        this.userService.unsubscribeToSubreddot(this.subreddotId).subscribe(res => {
          this.init();
        });
      } else {
        this.isSubscribed = true;
        this.userService.subscribeToSubreddot(this.subreddotId).subscribe(res => {
          this.init();
        });
      }
  }

  async switchSort() {
    console.log('switch');
    if (this.sort == 'date') {
      this.postService.getSubPostsByPopularity(this.subreddotId).subscribe(res => {
        this.posts = res as Array<Post>;
        this.sort = 'popularity';
      });
    } else {
      this.postService.getSubPostsByDate(this.subreddotId).subscribe(res => {
        this.posts = res as Array<Post>;
        this.sort = 'date';
      });
    }
  }
}
