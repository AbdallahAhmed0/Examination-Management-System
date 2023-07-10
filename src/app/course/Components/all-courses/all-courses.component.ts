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
  adminId: number = 0;

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

    if (this.permittedToManageCourses && !this.ableToShowCoursesOfAdmin) {
      this.getCourses();
    } else if (this.ableToShowCoursesOfAdmin) {
      this.courses = this.getAdminCourses();
    }
    else if (this.ableToShowCoursesOfGroup) {

      this.courseService.getStudentGroup(this.storageService.getUser().userId).subscribe((studentGroup) => {
        console.log(studentGroup)
        this.courseService.getCoursesByGroupId(studentGroup).subscribe(
          (data) => {
            this.courses = data;
          });
        });

    }

  }

  getAdminCourses() : Course[]{
    this.adminCourses = this.courseSharedService.getCoursesByAdminId(
      this.storageService.getUser().userId
    );
    return this.adminCourses;
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
