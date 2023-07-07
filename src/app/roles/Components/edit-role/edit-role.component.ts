import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../Services/roles.service';
import { Role } from './../../Models/role';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss'],
})
export class EditRoleComponent implements OnInit {
  roleEdit: Role = {} as Role;
  role: Role = {} as Role;
  editRoleName!: string;
  privileges: { id: number; name: string; checked: boolean }[] = [];

  privilegeGroups: {
    name: string;
    privileges: { id: number; name: string; checked: boolean }[];
  }[] = [];
  constructor(
    private rolesService: RolesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = Number(paramMap.get('id'));
      this.role.id = id;
      this.rolesService.getRoleByID(id).subscribe((data) => {
        this.roleEdit = data;
        this.editRoleName = this.roleEdit.role;

        this.rolesService.getPrivileges().subscribe((privileges) => {
          this.privileges = privileges.map((privilege) => ({
            id: privilege.id,
            name: privilege.name,
            checked: this.roleEdit.privileges.some(
              (p) => p.id === privilege.id
            ),
          }));

          // Divide the privileges into 8 groups with 5 privileges in each group
          for (let i = 0; i < 5; i++) {
            this.privilegeGroups.push({
              name: `${i + 1}`,
              privileges: this.privileges.slice(i * 5, (i + 1) * 5),
            });
          }
        });
      });
    });
  }

  save() {
    const selectedPrivileges = this.privileges.filter(
      (privilege) => privilege.checked
    );
    this.rolesService
      .updateRoleWithPrivileges(this.roleEdit, selectedPrivileges)
      .subscribe((data) => {
        this.rolesService.openSnackBar('Updated');
        this.goback();
      });
  }
  goback() {
    this.router.navigate(['roles']);
  }
}
