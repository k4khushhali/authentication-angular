declare var google: any;
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  submitted = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('email', email as string);
          this.toastr.success('Login successfully!', 'Success');
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error('Email or password is wrong', 'Error');
        }
      },
      error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    )
  }

}
