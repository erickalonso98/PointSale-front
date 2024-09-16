export interface ISale{
    id:number;
    user_id:number;
    client_id:number;
    box_id:number;
    total:number;
    created_at?:Date;
    updated_at?:Date;
}