import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { StorageService } from '../../login/Services/storage.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  permissions: Object[] = [];

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  permittedToViewDashboard: boolean = false;
  permittedToViewAdmins: boolean = false;
  permittedToViewStudents: boolean = false;
  permittedToViewCourses: boolean = false;
  permittedToViewExams: boolean = false;
  permittedToViewRoles: boolean = false;
  permittedToViewCoursesGroup:boolean = false;
  constructor(private storageService: StorageService) {}
  ngOnInit(): void {
    this.permissions = this.storageService.getUser().permissions;

    // Dashboard
    if (
      this.permissions.some((role: any) => role.authority === 'DASHBOARD_ROLE')
    )
    {
      this.permittedToViewDashboard = true;
    }
    // Admins
    if (
      this.permissions.some(
        (role: any) => role.authority === 'SHOW_ADMINS_LIST_ROLE'
      ) ||
      this.permissions.some(
        (role: any) => role.authority === 'MANAGE_ADMIN_ROLE'
      )
    ) {
      this.permittedToViewAdmins = true;
    }

    // Students
    if (
      this.permissions.some(
        (role: any) => role.authority === 'SHOW_ALL_STUDENTS_ROLE'
      ) ||
      this.permissions.some(
        (role: any) => role.authority === 'MANAGE_STUDENT_ROLE'
      )
    ) {
      this.permittedToViewStudents = true;
    }

    //   // Courses
    if (
      this.permissions.some(
        (role: any) => role.authority === 'MANAGE_COURSES_ROLE'
      ) ||
      this.permissions.some(
        (role: any) => role.authority === 'SHOW_COURSES_OF_ADMIN_ROLE'
      ) ||
      this.permissions.some(
        (role: any) => role.authority === 'SHOW_COURSE_OF_GROUP_ROLE'
      )
    ) {
      this.permittedToViewCourses = true;
    }

    // Exams
    if (
      this.permissions.some(
        (role: any) => role.authority === 'MANAGE_EXAMS_ROLE'
      ) ||
      this.permissions.some((role: any) => role.authority === 'MANAGE_ADMIN_EXAMS_ROLE')
    ) {
      this.permittedToViewExams = true;
    }

    // Roles
    if (
      this.permissions.some((role: any) => role.authority === 'MANAGE_ROLE')
    ) {
      this.permittedToViewRoles = true;
    }
    // Group Courses
    if (
      this.permissions.some((role: any) => role.authority === 'SHOW_COURSE_OF_GROUP_ROLE')
    ) {
      this.permittedToViewCoursesGroup = true;
    }
  }
  
}
