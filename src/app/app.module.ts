import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginModule } from './modules/login.module';
import { TransactionsModule } from './modules/transactions.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionFilterPipe } from './pipes/transaction.filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransactionFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    TransactionsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
