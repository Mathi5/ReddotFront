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

    constructor(
      private route: ActivatedRoute,
      private subReddotService: SubReddotService,
      private postService: PostServiceService,
      private userService: UserService,
    ) {
      this.subreddotId = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
      this.subReddotService.getSubReddot(this.subreddotId).subscribe(res => {
        this.subreddot = res as Subreddot;
        console.log(this.subreddot);
      });
      console.log(this.subreddotId);
      this.postService.getPostBySubId(this.subreddotId).subscribe(res => {
        this.posts = res as Array<Post>;
      });
      this.userService.getUser().subscribe(res => {
        this.user = res as User;

      });
    }

    /*addPost() {
      console.log(this.user.id);

        const userId =  localStorage.getItem('userId');
        if (userId) {

          this.postService.addPost(this.subreddotId, 'test', 'content', "gr", userId).subscribe(res => {
            console.log(res);
          });
        }

    }*/
}
