import { Role } from "src/app/roles/Models/role";

export interface Students {
  id:number,
  firstName:string,
  lastName:string,
  universityId:number,
  email:string,
  password:string,
  roles:Role[],
  locked?:boolean,
  enable?:boolean,
  year:number
}
