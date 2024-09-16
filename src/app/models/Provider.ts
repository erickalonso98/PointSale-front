export interface IProvider{
    id:number;
    name:string;
    lastname:string;
    email:string;
    company:string;
    address?:string;
    phone?:string;
    created_at?:Date;
    updated_at?:Date;
}