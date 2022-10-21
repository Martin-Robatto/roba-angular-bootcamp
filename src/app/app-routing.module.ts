import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateTransactionComponent } from './components/transactions/create-transaction/create-transaction.component';
import { TransactionsListComponent } from './components/transactions/transactions-list/transactions-list.component';
import { AuthGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'transactions', component: TransactionsListComponent, canActivate: [AuthGuard]},
  {path: 'transaction', component: CreateTransactionComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
