import { Comment } from "./comment.model";

export interface CommentWithChildren {
    _id: String;
    content:String;
    commentUser:String;
    commentPost:String;
    children?:Array<CommentWithChildren>;
}