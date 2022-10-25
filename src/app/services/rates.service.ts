import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRates } from '../interfaces/rates';

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  private ratesUrl = `${environment.december_api}/transactions/rates`;

  constructor(private http: HttpClient) { }

  getRates(): Observable<IRates> {
    return this.http.get<IRates>(this.ratesUrl).pipe(tap(response => console.log(response)));
  }
}
