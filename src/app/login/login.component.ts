import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { API_URL } from '../helper/apiRoute';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  show: boolean = false;
  login: string = "none"
  signup: string = "none"
  forgot: string = "none"
  loginForm!: FormGroup
  signupForm!: FormGroup
  forgotForm!: FormGroup;
  loader = false;
  isLoggedin?: boolean;

  constructor(private fb: FormBuilder, private router: Router, private appService: AppService, private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  };

  onLogin(formData: any) {
    formData.markAllAsTouched();
    if (formData.invalid) {
      return;
    }
    this.loader = true;
    let bodyPayload = new URLSearchParams();
    bodyPayload.set('email', formData.value.email)
    bodyPayload.set('password', formData.value.password)

    this.appService.post(API_URL.login, bodyPayload.toString()).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loader = false
        if (res.success == true) {
          this.authService.localSave()
          this.router.navigate(['todays_race'])

        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          })

          this.loader = false
        }
      },
      error: err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title:'Something went wrong',
          showConfirmButton: false,
          timer: 1500
        })

        // this.toastr.error('Something went wrong');
        this.loader = false
      }
    })
  };

  // password type change
  showeye() {
    this.show = !this.show;
  };

  get ctrl() {
    return this.loginForm.controls
  };

}
