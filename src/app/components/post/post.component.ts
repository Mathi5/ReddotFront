import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/models/post.model';
import { User } from 'src/models/user.model';
import { UpvoteService } from 'src/services/upvote.service';
import { UserService } from 'src/services/user.service';
import {PostServiceService} from "../../../services/post-service.service";
import {SubReddotService} from "../../../services/sub-reddot.service";

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
  upvotesNumber: number = 0;
  pseudoAuthor: string = "";
  subReddotName: string = "";
  upvoteCount = 0;

  date: String | undefined;

  @Input() post?:Post;

  constructor(
    private router:Router,
    private userService:UserService,
    private upvoteService:UpvoteService,
    private postService:PostServiceService,
    private subReddotService:SubReddotService,
  ) {
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

    });

    this.upvoteCount = (this.post?.postUpvotes.length as number) - (this.post?.postDownvotes.length as number);

    this.userService.getUserById(this.post?.postUser ?? '').subscribe(res => {
      const user = res as User;
      this.pseudoAuthor = user.pseudo as string;
    });

    this.subReddotService.getSubReddot(this.post?.postSub ?? '').subscribe(res => {
      const subReddot = res as any;
      this.subReddotName = subReddot.name as string;
    });

    this.date = new Date(this.post?.createdAt ?? '').toLocaleString();
  }

  async upvote() {
    if (localStorage.getItem('userId') == null) {
      this.router.navigate(['/login']);
      return;
    }
    console.log("UPVOTE");
    if(this.isUpvoted) {
      this.isUpvoted = false;
      this.upvoteCount--;
      if(this.post) {
        this.upvoteService.removeUpvotePost(this.post._id).subscribe();
      }
    } else {

      if(this.post && this.isDownvoted) {
        this.upvoteCount++;
        this.upvoteService.removeDownvotePost(this.post._id).subscribe();
      }

      this.isUpvoted = true;
      this.isDownvoted = false;
      this.upvoteCount++;

      if(this.post) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 3 sec
        this.upvoteService.upvotePost(this.post._id).subscribe();
      }
    }
  }

  async downvote() {
    if (localStorage.getItem('userId') == null) {
      this.router.navigate(['/login']);
      return;
    }
    console.log("DOWNVOTE");
    if(this.isDownvoted) {
      this.upvoteCount++;
      this.isDownvoted = false;

      if(this.post) {
        this.upvoteService.removeDownvotePost(this.post._id).subscribe((res) => {});
      }
    } else {
      if(this.post && this.isUpvoted) {
        this.upvoteCount--;
        this.upvoteService.removeUpvotePost(this.post._id).subscribe();
      }
      this.isUpvoted = false;
      this.isDownvoted = true;
      this.upvoteCount--;

      if(this.post) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.upvoteService.downvotePost(this.post._id).subscribe();
      }
    }
  }

  goToPost() {
    const postDate = new Date(this.post?.createdAt ?? '').toLocaleString();
    console.log("creation date : " + postDate);
    this.router.navigate(['/posts', this.post?._id])
  }

  goToSub() {
    this.router.navigate(['/subreddot', this.post?.postSub])
  }

  getUpvotesNumber() : string {
    if(this.post) {
      let numbUV = (this.post.postUpvotes.length - this.post.postDownvotes.length);
      let k = "";
      if(numbUV > 1000) {
        numbUV = numbUV / 1000;
        k = "k";
      } else if(numbUV > 1000000) {
        numbUV = numbUV / 1000000;
        k = "M";
      }

      return numbUV.toFixed(0).toString() + k;

    }
    return "0";
  }
}
