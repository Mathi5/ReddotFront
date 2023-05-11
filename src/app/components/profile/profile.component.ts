import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';
import { AuthServiceService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userId = "";
  loggedUser: User = {id: '', mail: '', pseudo: '', password: '', userPosts: [], userSubscribes: []};
  editMode = false;
  changePassword = false;
  
  profileForm: FormGroup;

  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
    ) {
      this.profileForm = this.fb.group({
        pseudo: ['', [Validators.required, Validators.minLength(3)]],
        mail: ['', [Validators.required, Validators.email]],
        oldPassword: [''],
        newPassword: [''],
      });
    }
    
    ngOnInit(): void {
      // @ts-ignore
      this.userId = localStorage.getItem('userId');
      
      this.getUser(this.userId).subscribe(res => {
        this.loggedUser = res as User;
      });
      
    }
    
    getUser(id: string) {
      return this.http.get(`http://localhost:3000/users/${id}`);
    }
    
    onSubmit() {
      if (this.profileForm.valid) {
        var updatedUser: User = {id: '', mail: '', pseudo: '', password: '', userPosts: [], userSubscribes: []};
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
        this.updateUser(updatedUser);
        
        this.editMode = false;

        this.getUser(this.userId).subscribe(res => {
          this.loggedUser = res as User;
        });
      }
    }
    
    checkPassword(oldPassword: string) {
      if (oldPassword !== this.loggedUser.password) {
        return false;
      }
      return true;
    }
    
    updateUser(updatedUser: User) {
      this.http.put(`http://localhost:3000/users/${this.userId}`, updatedUser).subscribe(res => {
      console.log(res);
      });
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
