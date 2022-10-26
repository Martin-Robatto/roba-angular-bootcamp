import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login.module').then(m => m.LoginModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./modules/transactions.module').then(m => m.TransactionsModule)
  },
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
