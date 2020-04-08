import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  isLoginMode = true;
  error: string;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user) {
        this.router.navigate(['/home']);
      }
    });
    if (this.router.url === '/register') {
      this.isLoginMode = false;
    } else {
      this.isLoginMode = true;
    }
  }

  OnSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.authService.singin(email, password);
    } else {
      authObservable = this.authService.singup(email, password);
    }

    authObservable.subscribe(
      response => {
        this.isLoading = false;
        this.router.navigate(['/home']);
        this.isLoginMode = true;
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    );
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  onClose() {
    this.error = null;
  }
}
