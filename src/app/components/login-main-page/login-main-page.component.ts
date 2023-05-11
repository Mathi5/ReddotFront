import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import { AuthServiceService} from "../../../services/auth-service.service";

@Component({
  selector: 'app-login-main-page',
  templateUrl: './login-main-page.component.html',
  styleUrls: ['./login-main-page.component.css']
})
export class LoginMainPageComponent {
  
  loginForm: FormGroup;
  
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService
    ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    }
    
    onSubmit() {
      if (this.loginForm.valid) {
        const email = this.loginForm.get('email')!.value;
        const password = this.loginForm.get('password')!.value;
        this.authService.login(email, password);
      }
    }
    
  }
  