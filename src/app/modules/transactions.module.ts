import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from '../components/transactions/transactions-list/transactions-list.component';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort'
import {MatTableModule} from '@angular/material/table'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '../pipes/currency.pipe';
import { CreateTransactionComponent } from '../components/transactions/create-transaction/create-transaction.component';
import { ReceiptComponent } from '../components/transactions/receipt/receipt.component';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.guard';

const routes: Routes = [
  {path: 'transaction', component: CreateTransactionComponent, canActivate: [AuthGuard]},
  {path: '', component: TransactionsListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [TransactionsListComponent, CurrencyPipe, CreateTransactionComponent, ReceiptComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TransactionsModule { }
