export interface Comment {
    _id: String;
    content:String;
    commentUser:String;
    commentPost:String;
    commentUpvotes:String[];
    commentDownvotes:String[];
    parent?:String;
}