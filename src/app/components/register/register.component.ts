import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import { OnInit } from "@angular/core";
import {Router} from "@angular/router";

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
    private router: Router,
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
    if (!this.checkPasswordConfirm()) {
      this.registerForm.get('passwordConfirm')!.setErrors({notSame: true});
      return;
    }
    if (this.registerForm.valid) {
      this.userService.checkUserData(
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
            this.router.navigate(['/login']);
          });
        }
        this.registerForm.get('pseudo')!.setErrors({alreadyExist: true});
        this.registerForm.get('mail')!.setErrors({alreadyExist: true});
        return;
      });
    }
  }

  checkPasswordConfirm() {
    const password = this.registerForm.get('password')!.value;
    const passwordConfirm = this.registerForm.get('passwordConfirm')!.value;
    return password === passwordConfirm;
  }

}
