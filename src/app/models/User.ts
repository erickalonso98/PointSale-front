export interface IUser{
    id:number;
    name:string;
    lastname:string;
    email:string;
    password:string;
    photo?:string;
    created_at?:Date;
    updated_at?:Date;
}