import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICreateTransactionResponse, ITransaction, ITransactionResponse } from 'src/app/interfaces/transaction';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  @Input() transactionData!: ICreateTransactionResponse;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  closeReceipt(): void{
    this.notify.emit();
  }
}
