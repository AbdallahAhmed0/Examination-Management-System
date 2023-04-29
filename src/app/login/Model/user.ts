import { Role } from "src/app/roles/Models/role";

export interface User {
  id?: number;
  email: string;
  password: string;
  roles: Role[];
}
