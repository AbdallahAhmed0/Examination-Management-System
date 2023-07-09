import { Component, OnInit } from '@angular/core';
import { Course } from '../../course.model';
import { CourseService } from './../../course.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from '../../../Shared/material/dialog/dialog.component';
import { CustomDialogeComponent } from 'src/app/Shared/material/custom-dialoge/custom-dialoge.component';
import { StorageService } from 'src/app/login/Services/storage.service';

import { CourseSharedServiceService } from 'src/app/Shared/course-shared-service.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
})
export class AllCoursesComponent implements OnInit {
  courses!: Course[];
  permissions: Object[] = [];
  permittedToManageCourses: boolean = false;
  permittedToShowCourses: boolean = false;
  ableToShowCoursesOfAdmin: boolean = false;
  ableToShowCoursesOfGroup: boolean = false;
  adminCourses: Course[] = [];
  groupCourses: Course[] = [];
  adminId: number = 0;
  studentGroup: number = 0;

  sentDataToDialoge:object={value:'',header:''};
  constructor(private courseService:CourseService,
              public dialog: MatDialog,
              private storageService: StorageService,
              private courseSharedService: CourseSharedServiceService
              ) { }

  ngOnInit(): void {
    this.permissions = this.storageService.getUser().permissions;

    this.permittedToManageCourses = this.permissions.some(
      (role: any) => role.authority === 'MANAGE_COURSES_ROLE'
    );

    this.ableToShowCoursesOfAdmin = this.permissions.some(
      (role: any) => role.authority === 'SHOW_COURSES_OF_ADMIN_ROLE'
    );

    this.ableToShowCoursesOfGroup = this.permissions.some(
      (role: any) => role.authority === 'SHOW_COURSE_OF_GROUP_ROLE'
    );

    if (this.permittedToManageCourses) {
      this.getCourses();
    } else if (this.ableToShowCoursesOfAdmin) {
      this.courses = this.getAdminCourses();
    }
    else if (this.ableToShowCoursesOfGroup) {
      this.courses = this.getGroupCourses();
    }

    console.log(this.storageService.getToken());
  }

  getAdminCourses() : Course[]{
    this.adminCourses = this.courseSharedService.getCoursesByAdminId(
      this.storageService.getUser().userId
    );
    return this.adminCourses;
  }

  getGroupCourses() : Course[]{
    this.courseService.getStudentGroup(this.storageService.getUser().userId).subscribe((data) => {
      this.studentGroup = data;
    });
    this.courseService.getCoursesByGroupId(this.studentGroup).subscribe(
      (data) => {
        this.groupCourses = data;
        console.log(this.groupCourses);
      }
    );
    return this.groupCourses;
  }

  getCourses() {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  deleteCourse(course: any) {
    // check if course contain Teachers
    if (course.admins.length) {
      const dialogRef = this.dialog.open(CustomDialogeComponent, {
        width: '400px',
        height: '280px',
        data: {
          value: 'Must Delete All Teachers in this Course Before Delete.',
          header: 'Not Allowed',
        }, // Pass the value as an object property
      });

      dialogRef.afterClosed().subscribe((result) => {});
      // check if course contain Exams
    } else if (course.numOfExams) {
      const dialogRef = this.dialog.open(CustomDialogeComponent, {
        width: '400px',
        height: '280px',
        data: {
          value: 'Must Delete All Exams in this Course Before Delete.',
          header: 'Not Allowed',
        }, // Pass the value as an object property
      });

      dialogRef.afterClosed().subscribe((result) => {});
    } else {
      const dialogRef = this.dialog.open(DialogeComponent, {
        width: '400px',
        height: '280px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'confirm') {
          this.courseService.deleteCourse(course.id).subscribe((data) => {
            window.location.reload();
            this.courseService.openSnackBar('Deleted');
          });
        }
      });
    }
  }
}
