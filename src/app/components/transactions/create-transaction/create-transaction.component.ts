import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { ICreateTransaction, ICreateTransactionResponse } from 'src/app/interfaces/transaction';
import { IUserAccount } from 'src/app/interfaces/userAccount';
import { AccountsService } from 'src/app/services/accounts.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit, OnDestroy {

  createTransactionForm!: FormGroup;
  private subscription!: Subscription;
  public userAccounts!: IUserAccount[];
  public currencies: string[] = ['USD', 'URU', 'EU'];
  public showReceipt: boolean = false;
  public receiptData!: ICreateTransactionResponse;

  constructor(private formBuilder: FormBuilder, private accountsService: AccountsService, private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.createTransactionForm = this.formBuilder.group({
      account_from: ['', Validators.required],
      account_to: ['', Validators.required],
      amount: ['', Validators.required],
      currency_name: ['', Validators.required],
      description: ['', Validators.maxLength(128)]
    });
    this.getUserAccounts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUserAccounts(): void {
    this.subscription = this.accountsService.getUserAccounts().subscribe(
      next => this.userAccounts = next.data,
      error => this.handleError(error),
    )
  }

  resetForm(): void {
    this.createTransactionForm.reset();
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

  closeReceipt() {
    this.showReceipt = !this.showReceipt;
  }

  saveTransaction(): void {
    if (!this.createTransactionForm.errors) {
      let values = this.createTransactionForm.value;
      values.account_from = Number(values.account_from);
      console.log(values);
      this.validateInputs(values);
      if (confirm("¿Confirm transaction?")) {
        this.transactionsService.postTransaction(values).subscribe(
          next => this.displayReceipt(next),
          error => this.handleError(error),
        );
      }
    }
  }

  displayReceipt(response : ICreateTransactionResponse): void {
    this.receiptData = response;
    this.showReceipt = !this.showReceipt
  }

  validateInputs(values: ICreateTransaction): void {
    if (isNaN(Number(values.account_from)) || Number(values.account_from) < 1) {
      throw new Error("Invalid from account id");
    }
    if (!values.account_to || Number(values.account_to) < 1) {
      throw new Error("Invalid to account id");
    }
    if (Number(values.amount) < 1) {
      throw new Error("Invalid amount");
    }
    if(values.description && values.description.length > 128){
      throw new Error("Invalid reference length");
    }
    this.resetForm();
  }
}
