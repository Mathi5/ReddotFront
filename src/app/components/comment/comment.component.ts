import { Component, Input } from '@angular/core';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { CommentWithChildren } from 'src/models/comment-with-children.model';
import { User } from 'src/models/user.model';
import { CommentEmitterServiceService } from 'src/services/comment-emitter-service.service';
import { UpvoteService } from 'src/services/upvote.service';
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
  upvoteCount = 0;
  @Input() index = 0;
  username:string = '';

  constructor(private userService:UserService, private upvoteService:UpvoteService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.upvoteCount = (this.comment?.commentUpvotes.length as number) - (this.comment?.commentDownvotes.length as number);

    this.userService.getUserById(this.comment?.commentUser as string).subscribe(res => {
      const user = res as User;
      this.username = user.pseudo as string;
    });

    this.userService.getUser().subscribe(res => {
      const actualUser = res as User;


      if(actualUser) {
        if(actualUser.userCommentUpvotes.indexOf(this.comment?._id ?? '') != -1){
          this.isUpvoted = true;
        }
        if(actualUser.userCommentDownvotes.indexOf(this.comment?._id ?? '') != -1){
          this.isDownvoted = true;
        }
      }
    })
  }

  respondToComment() {
    var commentId = this.comment?._id as string ?? '';
    CommentEmitterServiceService.setCommentId(commentId);
  }

  async upvote() {
    if(this.isUpvoted) {
      this.isUpvoted = false;
      this.upvoteCount--;
      if(this.comment) {
        this.upvoteService.removeUpvoteComment(this.comment._id).subscribe();
      }
    } else {

      if(this.comment && this.isDownvoted) {
        this.upvoteCount++;
        this.upvoteService.removeDownvoteComment(this.comment._id).subscribe();
      }

      this.isUpvoted = true;
      this.isDownvoted = false;
      this.upvoteCount++;

      if(this.comment) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 3 sec
        this.upvoteService.upvoteComment(this.comment._id).subscribe();
      }
    }
  }

  async downvote() {
    if(this.isDownvoted) {
      this.isDownvoted = false;
      this.upvoteCount++;

      if(this.comment) {
        this.upvoteService.removeDownvoteComment(this.comment._id).subscribe((res) => {});
      }
    } else {
      if(this.comment && this.isUpvoted) {
        this.upvoteCount--;
        this.upvoteService.removeUpvoteComment(this.comment._id).subscribe();
      }
      this.isUpvoted = false;
      this.isDownvoted = true;
      this.upvoteCount--;

      if(this.comment) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.upvoteService.downVoteComment(this.comment._id).subscribe();
      }
    }
  }
}
