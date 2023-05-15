import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/models/post.model';
import { User } from 'src/models/user.model';
import { UpvoteService } from 'src/services/upvote.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  isUpvoted = false;
  isDownvoted = false;
  https: any;

  @Input() post?:Post;

  constructor(private router:Router, private userService:UserService, private upvoteService:UpvoteService) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(res => {
      const user = res as User;
      if(user.userUpvotes.indexOf(this.post?._id ?? '') != -1){
        this.isUpvoted = true;
      }
      if(user.userDownvotes.indexOf(this.post?._id ?? '') != -1){
        this.isDownvoted = true;
      }
    })
  }

  async upvote() {
    console.log("UPVOTE");
    if(this.isUpvoted) {
      this.isUpvoted = false;
      if(this.post) {
        this.upvoteService.removeUpvotePost(this.post._id).subscribe();
      }
    } else {

      if(this.post && this.isDownvoted) {
        this.upvoteService.removeDownvotePost(this.post._id).subscribe();
      }

      this.isUpvoted = true;
      this.isDownvoted = false;

      if(this.post) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 3 sec
        this.upvoteService.upvotePost(this.post._id).subscribe();
      }
    }
  }

  async downvote() {
    console.log("DOWNVOTE");
    if(this.isDownvoted) {
      this.isDownvoted = false;

      if(this.post) {
        this.upvoteService.removeDownvotePost(this.post._id).subscribe((res) => {});
      }
    } else {
      if(this.post && this.isUpvoted) {
        this.upvoteService.removeUpvotePost(this.post._id).subscribe();
      }
      this.isUpvoted = false;
      this.isDownvoted = true;

      if(this.post) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.upvoteService.downvotePost(this.post._id).subscribe();
      }
    }
  }

  goToPost() {
    this.router.navigate(['/posts', this.post?._id])
  }
}
