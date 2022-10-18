export interface ILoginResponse {
    data: {
    id: number;
    email: string;
    name: string;
    password: string;
    token: string;
    tokenExpiration: string;}
}
