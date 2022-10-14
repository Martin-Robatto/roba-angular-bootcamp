import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { Observable } from 'rxjs';
import { ILogin } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = "https://decemberbank.inhouse.decemberlabs.com/api/users/login";
  constructor(private http: HttpClient) { }

  loginUser(credentials : ILogin): Observable<IUser> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IUser>(this.loginUrl, credentials, { headers });
  }
}
