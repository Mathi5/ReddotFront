import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentEmitterServiceService {

  private static commentId:String = '';

  private static commentIdSubject = new Subject<string>();

  static setCommentId(value: string) {
    this.commentId = value;
    this.commentIdSubject.next(value);
  }

  static getCommentIdAsObservable() {
    return this.commentIdSubject.asObservable();
  }

  constructor() { }

}
