import { Component, Input } from '@angular/core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

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

  upvote() {
    this.isUpvoted = true;
    this.isDownvoted = false;
  }

  downvote() {
    this.isUpvoted = false;
    this.isDownvoted = true;
  }
}
