import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRates } from 'src/app/interfaces/rates';
import { ICreateTransactionResponse } from 'src/app/interfaces/transaction';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent {
  @Input() transactionData!: ICreateTransactionResponse;
  @Input() amountToSubstract!: string;
  @Input() rates!: IRates;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  closeReceipt(): void{
    this.notify.emit();
  }
}
