import { Role } from "src/app/roles/Models/role";

export interface Admin {
    id:number,
    firstName:string,
    lastName:string,
    universityId:number,
    email:string,
    password:string,
    roles:Role[],
    locked?:boolean,
    enable?:boolean,
    specialization:string
}
