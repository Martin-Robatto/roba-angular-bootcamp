import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserAccounts } from '../interfaces/userAccount';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private transactionsUrl = `${environment.december_api}/accounts`;

  constructor(private http: HttpClient) { }

  getUserAccounts(): Observable<IUserAccounts> {
    return this.http.get<IUserAccounts>(this.transactionsUrl).pipe(tap(response => console.log(response)));
  }
}
