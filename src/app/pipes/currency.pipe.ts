import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(val: string, currency: string) {
    switch(currency) {
      case 'EU':
        currency = 'EUR';
        break;
      case 'URU':
        currency = 'UYU';
        break;
      default:
        currency = 'USD';
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(Number(val));
  }
}
