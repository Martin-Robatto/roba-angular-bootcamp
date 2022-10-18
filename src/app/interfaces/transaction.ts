export interface ITransactionResponse {
    data: [{
        id: string;
        description: string;
        amount: string;
        amount_from: string;
        from_account_id: string;
        currency_name: string;
        amount_to: string;
        to_account_id: string;
        createdAt: string;
    }]
}

export interface ITransaction {
    id: string;
    description: string;
    amount: string;
    amount_from: string;
    from_account_id: string;
    currency_name: string;
    amount_to: string;
    to_account_id: string;
    createdAt: string;
}