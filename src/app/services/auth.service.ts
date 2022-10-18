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
  }

  logout(): void {
    if(!localStorage.getItem("ACCESS_TOKEN")){
      alert('No user logged');
    }else{
      localStorage.removeItem("ACCESS_TOKEN");
      alert('Log out successfully');
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  public getToken(): string | null {
    return localStorage.getItem('ACCESS_TOKEN');
  }
}
