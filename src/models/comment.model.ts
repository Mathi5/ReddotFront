export interface Comment {
    _id: String;
    content:String;
    commentUser:String;
    commentPost:String;
    parent?:String;
}