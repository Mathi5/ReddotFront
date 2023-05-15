import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';
import { AuthServiceService } from 'src/services/auth-service.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  loggedUser: User = {id: '', mail: '', pseudo: '', password: '', userPosts: [], userSubscribes: [], userUpvotes:[], userDownvotes:[], userCommentUpvotes:[], userCommentDownvotes:[]};
  editMode = false;
  changePassword = false;

  profileForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService
    ) {
      this.profileForm = this.fb.group({
        pseudo: ['', [Validators.required, Validators.minLength(3)]],
        mail: ['', [Validators.required, Validators.email]],
        oldPassword: [''],
        newPassword: [''],
      });
    }

    ngOnInit(): void {

      this.userService.getUser().subscribe(res => {
        // @ts-ignore
        this.loggedUser = res;
      });

    }

    onSubmit() {
      if (this.profileForm.valid) {
        var updatedUser: User = {id: '', mail: '', pseudo: '', password: '', userPosts: [], userSubscribes: [], userUpvotes:[], userDownvotes:[], userCommentUpvotes:[], userCommentDownvotes:[]};
        const pseudo = this.profileForm.get('pseudo')!.value;
        const mail = this.profileForm.get('mail')!.value;
        updatedUser.id = this.loggedUser.id;
        updatedUser.pseudo = pseudo;
        updatedUser.mail = mail;
        updatedUser.userPosts = this.loggedUser.userPosts;
        updatedUser.userSubscribes = this.loggedUser.userSubscribes;

        const oldPassword = this.profileForm.get('oldPassword')!.value;

        if (this.changePassword && this.checkPassword(oldPassword)) {
          const newPassword = this.profileForm.get('newPassword')!.value;
          updatedUser.password = newPassword;
        } else {
          updatedUser.password = this.loggedUser.password;
        }
        this.userService.updateUser(updatedUser).subscribe(res => {
          console.log(res);

          this.editMode = false;
          this.changePassword = false;

          this.userService.getUser().subscribe(res => {
            // @ts-ignore
            this.loggedUser = res;
          });
        });

      }
    }

    checkPassword(oldPassword: string) {
      return oldPassword === this.loggedUser.password;
    }

    updateValidators() {
      this.changePassword = !this.changePassword
      if (this.changePassword) {
        this.profileForm.controls['oldPassword'].setValidators([Validators.required, Validators.minLength(8)]);
        this.profileForm.controls['newPassword'].setValidators([Validators.required, Validators.minLength(8)]);
      } else {
        this.profileForm.controls['oldPassword'].clearValidators();
        this.profileForm.controls['newPassword'].clearValidators();
      }
      this.profileForm.controls['oldPassword'].updateValueAndValidity();
      this.profileForm.controls['newPassword'].updateValueAndValidity();
    }
  }
