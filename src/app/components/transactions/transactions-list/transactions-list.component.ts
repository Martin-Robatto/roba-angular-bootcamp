import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { IFilters } from 'src/app/interfaces/filters';
import { ITransaction } from 'src/app/interfaces/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit, OnDestroy, OnChanges {
  public transactions: ITransaction[] = [];
  private subscription!: Subscription;
  columnsToDisplay = ['id', 'from_account_id', 'to_account_id', 'currency_name', 
  'amount', 'createdAt'];
  public showFilters: boolean = false;
  filtersForm!: FormGroup;
  interval!: NodeJS.Timer;

  constructor(private transactionsService: TransactionsService, private formBuilder: FormBuilder) {   }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['filters']);
  }
  
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.populateTable();

    this.interval = setInterval(() => {
      this.populateTable();
    }, 60000);
    
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
    if(!this.showFilters){
      this.resetForm();
    }
  }

  applyFilters(): void {
    if(!this.filtersForm.pristine && !this.filtersForm.errors){
      const values : IFilters = this.filtersForm.value;
      if(values.from !== null){
        values.from = new Date(values.from).toISOString();
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
    if(values.from_account_id && Number(values.from_account_id) < 1){
      throw new Error("Invalid from account id");
    }
    if(values.to_account_id && Number(values.to_account_id) < 1){
      throw new Error("Invalid to account id");
    }
    if(values.id && Number(values.id) < 1){
      throw new Error("Invalid id");
    }
    if(values.page && Number(values.page) < 1){
      throw new Error("Invalid page");
    }
    if(values.page_size && Number(values.page_size) < 1){
      throw new Error("Invalid page size");
    }
    this.resetForm();
  }

  populateTable(): void {
    this.subscription = this.transactionsService.getTransactions().subscribe(
      next => this.transactions = next.data,
      error => this.handleError(error),
    );
  }

  resetForm(): void {
    this.filtersForm.reset();
  }
}
