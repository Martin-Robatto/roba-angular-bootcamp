import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionFilter'
})
export class TransactionFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
