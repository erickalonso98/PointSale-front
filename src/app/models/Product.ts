export enum Istatus{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}
export interface IProduct{
    id:number;
    code:string;
    name:string;
    description?:string;
    purchase_price:number;
    sale_price:number;
    stock:number;
    minimum_stock:number;
    photo?:string;
    status:Istatus,
    brand?:string;
    categories_id:number;
    suppliers_id:number;
    created_at?:Date;
    updated_at?:Date;
}