import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateTransaction, ICreateTransactionResponse, ITransaction, ITransactionResponse } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transactionsUrl = `${environment.december_api}/transactions`;
  
  constructor(private http: HttpClient) { }

  public getTransactions(): Observable<ITransactionResponse>{
    return this.http.get<ITransactionResponse>(this.transactionsUrl);
  }

  public getTransactionsFiltered(paramsToLoad: [string, any][]): Observable<ITransactionResponse>{
    let params = new HttpParams();
    paramsToLoad.forEach(param => {
      if(param[1]){
        params = params.append(param[0], param[1].toString());
      }
      });
      
    return this.http.get<ITransactionResponse>(this.transactionsUrl, { params });
  }

  public postTransaction(transaction: ICreateTransaction): Observable<any>{
    return this.http.post(this.transactionsUrl, transaction).pipe(tap(
      data => console.log(data)
    ));
  }
}
