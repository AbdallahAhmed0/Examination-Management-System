import { Role } from "src/app/roles/role";

export interface Students {
  id:number,
  firstName:string,
  lastName:string,
  universityId:number,
  email:string,
  password:string,
  roles:Role,
  locked?:boolean,
  enable?:boolean,
  year:string
}
