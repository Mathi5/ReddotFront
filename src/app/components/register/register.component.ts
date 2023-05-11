import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import { OnInit } from "@angular/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.registerForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(3)]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.registerForm.valid) {

      this.userService.checkUser(
        this.registerForm.get('mail')!.value,
        this.registerForm.get('pseudo')!.value
      ).subscribe((res) => {
        console.log(res);
        if(res) {
          const pseudo = this.registerForm.get('pseudo')!.value;
          const mail = this.registerForm.get('mail')!.value;
          const password = this.registerForm.get('password')!.value;
          this.userService.register(pseudo, mail, password).subscribe((res) => {
            console.log(res);
          });
        }
      });
    }
  }

}
