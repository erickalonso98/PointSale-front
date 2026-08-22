export interface ICompany{
    id:number;
    name:string;
    email:string;
    adreess:string;
    phone?:string;
    photo?:string;
    created_at?:Date;
    updated_at?:Date;
}