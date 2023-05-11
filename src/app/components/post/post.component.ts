import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/models/post.model';

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

  constructor(private router:Router) {
  }

  upvote() {
    this.isUpvoted = true;
    this.isDownvoted = false;
  }

  downvote() {
    this.isUpvoted = false;
    this.isDownvoted = true;
  }

  goToPost() {
    this.router.navigate(['/posts', this.post?._id])
  }
}
