import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginResponse } from '../interfaces/loginResponse';
import { Observable, tap } from 'rxjs';
import { ILoginForm } from '../interfaces/loginForm';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = '';
  private loginUrl = `${environment.december_api}/users/login`;
  private jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  login(credentials: ILoginForm): Observable<ILoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ILoginResponse>(this.loginUrl, credentials, { headers }).pipe(tap(response => {
      if (response) {
        this.saveToken(response.data.token, response.data.tokenExpiration);
      }
    }));
  }

  saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  logout(): void {
    if(this.token === ''){
      alert('No user logged');
    }else{
      this.token = '';
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("EXPIRES_IN");
      alert('Log out successfully');
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    console.log(token)
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }
}
