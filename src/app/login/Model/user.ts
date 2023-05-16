import { Role } from "src/app/roles/Models/role";


export class User {
    id!: number;
    email!: string;
    role!: Role;
    token?: string;
}
