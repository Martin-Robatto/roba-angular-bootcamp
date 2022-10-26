import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginModule } from './modules/login.module';
import { TransactionsModule } from './modules/transactions.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionFilterPipe } from './pipes/transaction.filter.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";

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
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule.forRoot({showForeground: true}),
    NgxUiLoaderHttpModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
