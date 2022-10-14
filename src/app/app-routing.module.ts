import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

const routes: Routes = [
  {path: '', component: TransactionsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: '**', component: TransactionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
