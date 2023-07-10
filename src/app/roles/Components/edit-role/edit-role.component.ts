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
          for (let i = 0; i < 4; i++) {
            this.privilegeGroups.push({
              name: `${i + 1}`,
              privileges: this.privileges.slice(i * 4, (i + 1) * 4),
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


  goback() {
    this.router.navigate(['roles']);
  }
}
