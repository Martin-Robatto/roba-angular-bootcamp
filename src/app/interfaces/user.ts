export interface IUser {
    id: number;
    email: string;
    name: string;
    password: string;
    token: string;
    tokenExpiration: number;
}
