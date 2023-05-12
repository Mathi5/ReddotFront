import { Component, Input } from '@angular/core';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { CommentWithChildren } from 'src/models/comment-with-children.model';
import { User } from 'src/models/user.model';
import { CommentEmitterServiceService } from 'src/services/comment-emitter-service.service';
import { UserService } from 'src/services/user.service';

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
  @Input() comment?:CommentWithChildren;
  @Input() index = 0;
  username:string = '';

  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.getUserById(this.comment?.commentUser as string).subscribe(res => {
      const user = res as User;
      this.username = user.pseudo as string;
    });
  }

  respondToComment() {
    var commentId = this.comment?._id as string ?? '';
    CommentEmitterServiceService.setCommentId(commentId);
  }

  upvote() {
    this.isUpvoted = !this.isUpvoted;
    this.isDownvoted = false;
  }

  downvote() {
    this.isUpvoted = false;
    this.isDownvoted = !this.isDownvoted;
  }
}
