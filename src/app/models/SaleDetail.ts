export interface ISaleDetail{
    id:number;
    product_id:number;
    sale_id:number;
    unit_price:number;
    quantity:number;
    total_price:number;
    created_at?:Date;
    updated_at?:Date;
};