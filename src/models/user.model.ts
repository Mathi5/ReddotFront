export interface User {
    id:String;
    mail:String;
    pseudo:String;
    password:String;
    userPosts:String[];
    userSubscribes:String[];
    userUpvotes:String[];
    userDownvotes:String[];
    userCommentUpvotes:String[];
    userCommentDownvotes:String[];
}
