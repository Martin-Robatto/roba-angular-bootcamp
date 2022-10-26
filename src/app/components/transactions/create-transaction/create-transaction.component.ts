import { HttpErrorResponse } from '@angular/common/http';
import { getSafePropertyAccessString } from '@angular/compiler';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { IRates } from 'src/app/interfaces/rates';
import { ICreateTransaction, ICreateTransactionResponse } from 'src/app/interfaces/transaction';
import { IUserAccount } from 'src/app/interfaces/userAccount';
import { AccountsService } from 'src/app/services/accounts.service';
import { RatesService } from 'src/app/services/rates.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { positiveNumberValidator } from 'src/app/validators/positiveNumber.validator';

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
  public amountToSubstract!: string;
  public rates!: IRates;
  errorMessage!: string;
  displayErrorMessage!: boolean;

  constructor(private formBuilder: FormBuilder, private accountsService: AccountsService, private transactionsService: TransactionsService, 
    private ratesService: RatesService) { }

  ngOnInit(): void {
    this.createTransactionForm = this.formBuilder.group({
      account_from: ['', [Validators.required, positiveNumberValidator]],
      account_to: ['', [Validators.required, positiveNumberValidator]],
      amount: ['', [Validators.required, positiveNumberValidator]],
      currency_name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(128)]]
    });
    this.displayErrorMessage = false;
    this.getUserAccounts();
    this.getRates();
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
    this.errorMessage = `${err.error.errors}`;
      this.displayErrorMessage = true;
    return throwError(() => this.errorMessage);
  }

  closeReceipt() {
    this.showReceipt = !this.showReceipt;
    this.createTransactionForm.reset();
  }

  saveTransaction(): void {
    let values = this.createTransactionForm.value;
    values.account_from = Number(values.account_from);
    if (this.createTransactionForm.valid) {
      if (confirm("¿Confirm transaction?")) {
      this.amountToSubstract = this.calculateConversion(values.currency_name, values.account_from, values.amount);
        this.transactionsService.postTransaction(values).subscribe(
          next => this.displayReceipt(next),
          error => this.handleError(error),
        );
      }
    }else{
      alert('There are some input errors');
    }
  }

  displayReceipt(response : ICreateTransactionResponse): void {
    this.receiptData = response;
    this.showReceipt = !this.showReceipt
  }

  calculateConversion(currency_name: string, accountFromId : number, amount: string): string {
    let amountToSubstract: number = Number(amount);
    let account = this.userAccounts.find(account => accountFromId === Number(account.id));
    if(account?.currency.name !== currency_name){
      if(currency_name === 'USD'){
        let amountParsed = Number(amount);
        amountToSubstract = (amountParsed * this.rates.data.usd);
      }
      if(currency_name === 'EU'){
        let amount2 = Number(amount);
        amountToSubstract = (amount2 * this.rates.data.eu);
      }
      if(account?.currency.name === 'USD'){
        amountToSubstract = amountToSubstract / this.rates.data.usd;
      }
      if(account?.currency.name === 'EU'){
        amountToSubstract = amountToSubstract / this.rates.data.eu;
      }
    }else{
      amountToSubstract = Number(amount);
    }
    return String(amountToSubstract);
  }

  getRates(): void {
    this.subscription = this.ratesService.getRates().subscribe(
      next => this.rates = next,
      error => this.handleError(error),
    )
  }

  closeErrorDisplay(): void{
    this.displayErrorMessage = false;
  }
}
