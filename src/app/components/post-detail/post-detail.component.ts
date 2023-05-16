import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentWithChildren } from 'src/models/comment-with-children.model';
import { Comment } from 'src/models/comment.model';
import { Post } from 'src/models/post.model';
import { CommentEmitterServiceService } from 'src/services/comment-emitter-service.service';
import { CommentServiceService } from 'src/services/comment-service.service';
import { PostServiceService } from 'src/services/post-service.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {

  post?: Post;
  comments?: Array<Comment>;
  commentsInTree?: Array<CommentWithChildren>;
  isLoading = true;
  id = '';
  commentForm: FormGroup;
  respondTo = '';


  constructor(
    private route: ActivatedRoute,
    private postService: PostServiceService,
    private commentService: CommentServiceService,
    private fb: FormBuilder,
    private userService: UserService) {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(1)]],
    });

    CommentEmitterServiceService.getCommentIdAsObservable().subscribe(res => {
      const commentId = res;
      var comment = this.comments?.find(x => x._id == commentId);
      this.respondTo = comment?.content as string;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(res => {
      this.id = res.get('id') ?? '';
      console.log(this.id);
    });

    this.postService.getPostById(this.id).subscribe(res => {
      this.post = res as Post;
      console.log("the post");
      console.log(this.post);
    });

    this.loadComments();
  }

  loadComments() {
    this.commentService.getCommentsFromPost(this.id).subscribe(res => {
      this.comments = res as Array<Comment>;
      this.commentsInTree = this.convertCommentsToCommentsWithChildren(this.comments);
      console.log(this.commentsInTree);
      this.isLoading = false;
    });
  }

  onSubmit() {
    if (this.commentForm.valid) {
      if (this.commentForm.valid) {
        const text = this.commentForm.get('text')!.value;
        var userId = this.userService.getUserId();
        const newComment: Comment = { _id: '', content: text, commentUser: userId, commentPost: this.id, parent: this.respondTo, commentUpvotes:[], commentDownvotes:[] };
        console.log('newComment');
        console.log(newComment);
        this.commentService.sendComment(newComment).subscribe(res => {

          this.loadComments();
          CommentEmitterServiceService.setCommentId('');

        });
      }
    }
  }

  //TOUCHE PAS CA MARCHE
  convertCommentToCommentWithChildren(comment: Comment, comments: Comment[]): CommentWithChildren {
    const commentWithChildren: CommentWithChildren = {
      _id: comment._id,
      content: comment.content,
      commentUser: comment.commentUser,
      commentPost: comment.commentPost,
      commentUpvotes: comment.commentUpvotes,
      commentDownvotes: comment.commentDownvotes
    };

    const children = comments.filter(c => c.parent === comment._id);
    console.log("children");
    console.log(children);

    if (children.length > 0) {
      commentWithChildren.children = children.map(c => this.convertCommentToCommentWithChildren(c, comments));
    }

    return commentWithChildren;
  }

  convertCommentsToCommentsWithChildren(comments: Comment[]): CommentWithChildren[] {
    const rootComments = comments.filter(c => !c.parent);

    return rootComments.map(c => this.convertCommentToCommentWithChildren(c, comments));
  }
}
