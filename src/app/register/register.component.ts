import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { passwordMatchValidator } from '../shared/password-match.directive';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    fullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = { ...this.registerForm.value };
      delete userData.confirmPassword;
      this.authService.registerUser(userData as User).subscribe(
        response => {
          console.log(response);
          this.toastr.success('Register successfully!', 'Success');
          this.router.navigate(['login'])
        },
        error => {
          this.toastr.error('Something went wrong', 'Error');
        }
      )
    }
  }

}
