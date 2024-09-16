export interface ICompany{
    id:number;
    name:string;
    email:string;
    address:string;
    photo?:string;
    created_at?:Date;
    updated_at?:Date;
}