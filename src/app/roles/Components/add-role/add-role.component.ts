import { Component, OnInit } from '@angular/core';

import { Role } from '../../Models/role';
import { RolesService } from '../../Services/roles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent implements OnInit {
  roleName!: string;

  role: Role = {} as Role;

  privileges: { id: number; name: string; checked: boolean }[] = [];

  privilegeGroups: {
    name: string;
    privileges: { id: number; name: string; checked: boolean }[];
  }[] = [];

  constructor(private rolesService: RolesService, private router: Router) {}

  ngOnInit(): void {
    this.rolesService.getPrivileges().subscribe((data) => {
      this.privileges = data.map((privilege) => ({
        id: privilege.id,
        name: privilege.name,
        checked: false,
      }));

      // Divide the privileges into 8 groups with 5 privileges in each group
      for (let i = 0; i < 4; i++) {
        this.privilegeGroups.push({
          name: `${i + 1}`,
          privileges: this.privileges.slice(i * 4, (i + 1) * 4),
        });
      }
    });
  }

  addRole() {
    const selectedPrivileges = this.privileges
    .filter((privilege) => privilege.checked);
  this.rolesService.addRoleWithPrivileges(this.roleName, selectedPrivileges)
    .subscribe((data) => {
      this.rolesService.openSnackBar('Added');
      this.goback();
    });
  }

  goback() {
    this.router.navigate(['roles']);
  }
}
