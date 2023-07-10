import { Component, OnInit } from '@angular/core';
import { Role } from '../../Models/role';
import { RolesService } from '../../Services/roles.service';
import { Router } from '@angular/router';

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

  constructor(
    private rolesService: RolesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rolesService.getPrivileges().subscribe((data) => {
      this.privileges = data.map((privilege) => ({
        id: privilege.id,
        name: privilege.name,
        checked: false,
      }));

      // Divide the privileges into groups
      // Adjust the grouping logic based on your requirements
      const groupSize = 4; // Number of privileges per group
      const numGroups = Math.ceil(this.privileges.length / groupSize);

      for (let i = 0; i < numGroups; i++) {
        this.privilegeGroups.push({
          name: `${i + 1}`,
          privileges: this.privileges.slice(i * groupSize, (i + 1) * groupSize),
        });
      }
    });
  }

  addRole() {
    const selectedPrivileges = this.privileges.filter((privilege) => privilege.checked);

    this.rolesService.addRoleWithPrivileges(this.roleName, selectedPrivileges).subscribe((data) => {
      this.rolesService.openSnackBar('Added');
      this.goback();
    });
  }

  goback() {
    this.router.navigate(['roles']);
  }

  isCheckboxDisabled(privilege: { id: number; name: string; checked: boolean }): boolean {
    if (privilege.name === 'MANAGE_ADMIN_EXAMS_ROLE') {
      return (
        this.privileges.some((p) => p.name === 'MANAGE_EXAMS_ROLE' && p.checked) ||
        this.privileges.some((p) => p.name === 'SOLVE_EXAM_ROLE' && p.checked)
      );
    }

    if (privilege.name === 'MANAGE_EXAMS_ROLE' ) {
      return this.privileges.some((p) => p.name === 'MANAGE_ADMIN_EXAMS_ROLE' && p.checked) ||
      this.privileges.some((p) => p.name === 'SOLVE_EXAM_ROLE' && p.checked);
    }
    if (privilege.name === 'SOLVE_EXAM_ROLE' ) {
      return this.privileges.some((p) => p.name === 'MANAGE_ADMIN_EXAMS_ROLE' && p.checked) ||
      this.privileges.some((p) => p.name === 'MANAGE_EXAMS_ROLE' && p.checked);
    }
    if (privilege.name === 'SHOW_COURSES_OF_ADMIN_ROLE') {
      return this.privileges.some((p) => p.name === 'SHOW_COURSE_OF_GROUP_ROLE' && p.checked);
    }

    if (privilege.name === 'SHOW_COURSE_OF_GROUP_ROLE') {
      return this.privileges.some((p) => p.name === 'SHOW_COURSES_OF_ADMIN_ROLE' && p.checked);
    }
    if (privilege.name === 'SHOW_STUDENTS_COURSE_ROLE') {
      return this.privileges.some((p) => p.name === 'SHOW_ALL_STUDENTS_ROLE' && p.checked);
    }
    if (privilege.name === 'SHOW_ALL_STUDENTS_ROLE') {
      return this.privileges.some((p) => p.name === 'SHOW_STUDENTS_COURSE_ROLE' && p.checked);
    }
    if (privilege.name === 'DASHBOARD_ROLE') {
      return this.privileges.some((p) => p.name === 'SHOW_COURSE_OF_GROUP_ROLE' && p.checked);
    }
    if (privilege.name === 'SHOW_COURSE_OF_GROUP_ROLE') {
      return this.privileges.some((p) => p.name === 'DASHBOARD_ROLE' && p.checked);
    }
    return false;
  }
}
