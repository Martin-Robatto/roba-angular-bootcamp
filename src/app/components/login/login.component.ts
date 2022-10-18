import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { ILoginForm } from 'src/app/interfaces/loginForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  login!: ILoginForm;
  subscription!: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  loginUser(): void {
    if(this.loginForm.valid){
      this.subscription = this.authService.login(this.loginForm.value).subscribe(
        next => this.handleLogin(),
        error => this.handleError(error)
      )
    }else{
      alert("Email and password are not valid");
      this.loginForm.reset();
    }
  }

  logout(): void {
    this.authService.logout();
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    alert(errorMessage);
    return throwError(() => errorMessage);
  }

  handleLogin(): void{
    alert('Logged in successfully!');
    this.loginForm.reset();
  }
}
