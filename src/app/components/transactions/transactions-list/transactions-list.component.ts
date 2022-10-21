import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { IFilters } from 'src/app/interfaces/filters';
import { ITransaction } from 'src/app/interfaces/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';
import { positiveNumberValidator } from 'src/app/validators/positiveNumber.validator';

@Component({
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  public transactions: ITransaction[] = [];
  private subscription!: Subscription;
  columnsToDisplay = ['id', 'from_account_id', 'to_account_id', 'currency_name', 
  'amount', 'createdAt'];
  public showFilters: boolean = false;
  filtersForm!: FormGroup;
  interval!: NodeJS.Timer;

  constructor(private transactionsService: TransactionsService, private formBuilder: FormBuilder) {   }
  
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
      from: [null, [positiveNumberValidator]],
      to: [null, [positiveNumberValidator]],
      from_account_id: [null, [positiveNumberValidator]],
      to_account_id: [null, [positiveNumberValidator]],
      page: [null, [positiveNumberValidator]],
      page_size: [null, [positiveNumberValidator]],
      sort_by: [null],
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
      const entries = Object.entries(values);
      this.subscription = this.transactionsService.getTransactionsFiltered(entries).subscribe(
        next => this.transactions = next.data,
        error => this.handleError(error),
      );
    }else{
      alert('There are some inputs errors');
    }
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
