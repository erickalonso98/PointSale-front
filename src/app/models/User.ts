import { IRole } from "./Role";

export interface IUser{
    id:number;
    name:string;
    lastname:string;
    email:string;
    roles?:Array<IRole>
    password:string;
    photo?:string;
    created_at?:Date;
    updated_at?:Date;
}