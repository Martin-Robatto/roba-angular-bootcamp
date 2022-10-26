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

export interface ICreateTransaction {
    description: string;
    amount: string;
    account_from: string;
    currency_name: string;
    account_to: string;
}

export interface ICreateTransactionResponse {
    "data": {
        id: number,
        from_account_id: number,
        to_account_id: number,
        amount: number,
        amount_from: number,
        amount_to: number,
        currency_name: string,
        description: string,
        updatedAt: string,
        createdAt: string
    }
}