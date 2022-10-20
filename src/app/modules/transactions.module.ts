import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from '../components/transactions/transactions.component';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort'
import {MatTableModule} from '@angular/material/table'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '../pipes/currency.pipe';

@NgModule({
  declarations: [TransactionsComponent, CurrencyPipe],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TransactionsModule { }
