import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { IFilters } from 'src/app/interfaces/filters';
import { ITransaction } from 'src/app/interfaces/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  public transactions: ITransaction[] = [];
  private subscription!: Subscription;
  columnsToDisplay = ['id', 'from_account_id', 'to_account_id', 'currency_name', 
  'amount', 'createdAt'];
  public showFilters: boolean = false;
  filtersForm!: FormGroup;

  constructor(private transactionsService: TransactionsService, private formBuilder: FormBuilder) { }
  
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this.transactionsService.getTransactions().subscribe(
      next => this.transactions = next.data,
      error => this.handleError(error),
    );

    this.filtersForm = this.formBuilder.group({
      from: null,
      to: null,
      from_account_id: null,
      to_account_id: null,
      page: null,
      page_size: null,
      sort_by: null,
      order_by: 'ASC'
    });
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

  setShowFilters(): void{
    this.showFilters = !this.showFilters;
  }

  applyFilters(): void {
    if(!this.filtersForm.pristine && !this.filtersForm.errors){
      const values : IFilters = this.filtersForm.value;
      if(values.from !== null){
        values.from = new Date(values.from).toISOString();
        console.log(values.from);
      }
      if(values.to !== null){
        values.from = new Date(values.from).toISOString();;
      }
      this.validateInputs(values);
      const entries = Object.entries(values);
      this.subscription = this.transactionsService.getTransactionsFiltered(entries).subscribe(
        next => this.transactions = next.data,
        error => this.handleError(error),
      );
    }
  }

  validateInputs(values: IFilters): void {
    if(Number(values.from_account_id) < 1 || Number(values.to_account_id) < 1){
      throw new Error("Account ids must be > 0");
    }
    if(Number(values.id) < 1){
      throw new Error("id must be > 0");
    }
    if(Number(values.page) < 1 || Number(values.page_size) < 1){
      throw new Error("Page and page size must be > 0");
    }
    this.filtersForm.reset();
  }
}
