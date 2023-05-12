import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/models/post.model';
import { PostServiceService } from 'src/services/post-service.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  newPost: Post = { _id:'', title:'', media:'', content:'', postUser:'', postSub:'' };

  addPostForm: FormGroup;

  

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private postService: PostServiceService,
    private route: ActivatedRoute
    ) {
      this.addPostForm = this.fb.group({
        title: ['', [Validators.required]],
        content: [''],
      });
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(res => {
      const subId = res.get('id') ?? '';
      this.newPost.postSub = subId;
    });
  }

  onSubmit() {
    if (this.addPostForm.valid) {
      const loggedUser = localStorage.getItem('userId');
      if (!loggedUser) {
        //redirect to login page

        return;
      }

      const title = this.addPostForm.get('title')!.value;
      const content = this.addPostForm.get('content')!.value;
      this.newPost.title = title;

      const formFile = document.getElementById('file') as HTMLInputElement;
      const uploadedFiles = formFile.files?.length;
      console.log(uploadedFiles);
      //this.addPostForm.get('file')!.value == ''

      if (uploadedFiles == 0) {
        this.newPost.media = 'text';
        this.newPost.content = content;

        this.postService.addPost(this.newPost.postSub, this.newPost.title, this.newPost.content, this.newPost.media, loggedUser ).subscribe(res => {
          console.log(res);
        });

      } else {
        this.newPost.media = 'picture';
        this.newPost.content = '';

        

        const imageFile = formFile.files!.item(0);

        if (imageFile) {
          console.log('imageFile ok');
          const reader = new FileReader();

          reader.onloadend = () => {
            const imageArrayBuffer = reader.result! as ArrayBuffer; // Récupérer le contenu de l'image sous forme d'ArrayBuffer
      
            // Convertir l'ArrayBuffer en Uint8Array
            const imageUint8Array = new Uint8Array(imageArrayBuffer);
            console.log('imageUint8Array : ' + imageUint8Array);
      
            // Appeler la fonction pour enregistrer l'image dans Firebase Cloud Storage
            //saveImageToFirebase(imageUint8Array);
            this.newPost.content = imageUint8Array.toString();
            console.log('image après toString : ' + this.newPost.content);

            this.postService.addPost(this.newPost.postSub, this.newPost.title, this.newPost.content, this.newPost.media, loggedUser ).subscribe(res => {
              console.log(res);
            });
          };
      
          reader.readAsArrayBuffer(imageFile); // Lire le fichier en tant qu'ArrayBuffer
        }
      }
      
      
    }
  }

}