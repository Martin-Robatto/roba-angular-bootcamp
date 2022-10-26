export interface IUserAccounts {
    data: [{
        id: string;
        balance: string;
        owner_id: string;
        createdAt: string;
        updatedAt: string;
        currency_id: string;
        currency: {
            name: string,
        },
    }]
}

export interface IUserAccount {
    id: string;
    balance: string;
    owner_id: string;
    createdAt: string;
    updatedAt: string;
    currency_id: string;
    currency: {
        name: string,
    }
}