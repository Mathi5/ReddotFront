export interface Post {
    _id:string;
    title:string;
    content:string;
    media:string;
    //file: Uint8Array;
    file: any;
    postUser:string;
    postSub:string;
}