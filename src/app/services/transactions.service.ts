import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITransactionResponse } from '../interfaces/transaction';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transactionsUrl = `${environment.december_api}/transactions`;
  
  constructor(private http: HttpClient, private authService : AuthService) { }

  public getTransactions(): Observable<ITransactionResponse>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ this.authService.getToken()});
    return this.http.get<ITransactionResponse>(this.transactionsUrl, {headers});
  }

  public getTransactionsFiltered(paramsToLoad: [string, any][]): Observable<ITransactionResponse>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ this.authService.getToken()});
    let params = new HttpParams();
    paramsToLoad.forEach(param => {
      if(param[1]){
        params = params.append(param[0], param[1].toString());
      }
      });
      const httpOptions = {
        headers: headers,
        params: params
      };
    return this.http.get<ITransactionResponse>(this.transactionsUrl, httpOptions).pipe(tap(
      response => console.log(response)
    ));
  }
}
