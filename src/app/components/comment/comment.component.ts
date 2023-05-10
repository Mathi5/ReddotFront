import { Component, Input } from '@angular/core';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComment = faComment;
  isUpvoted = false;
  isDownvoted = false;
  @Input() text = "";

  upvote() {
    this.isUpvoted = true;
    this.isDownvoted = false;
  }

  downvote() {
    this.isUpvoted = false;
    this.isDownvoted = true;
  }
}
