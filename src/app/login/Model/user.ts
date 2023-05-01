import { Role } from "src/app/roles/Models/role";


export class User {
    id!: number;
    firstName!: string;
    lastName!: string;
    username!: string;
    role!: Role;
    token?: string;
}
