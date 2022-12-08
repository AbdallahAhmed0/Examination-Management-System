import { Role } from "src/app/roles/role";

export interface Admin {
    id:number,
    firstName:string,
    lastName:string,
    universityId:number,
    email:string,
    password:string,
    roles:string,
    locked?:boolean,
    enable?:boolean,
    specialization:string
}
