import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/admins/Services/admins.service';
import { CourseService } from 'src/app/course/course.service';
import { Exam } from 'src/app/exam/Models/exam';
import { ExamService } from 'src/app/exam/Services/exam.service';
import { StorageService } from 'src/app/login/Services/storage.service';
import { StudentsService } from 'src/app/students/Services/students.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {

  totalExams = 0;
  totalStudents = 0;
  totalCourses = 0;
  totalTeachers = 0;
  permissions: Object[] = [];

  constructor(private examService: ExamService,
    private studentService: StudentsService,
    private courseService: CourseService,
    private teacherService: AdminsService,
    private storageService: StorageService) {

  }

  ngOnInit(): void {

    this.permissions = this.storageService.getUser().permissions;
    console.log(this.permissions);
    if ((
      this.permissions.some(
        (role: any) => role.authority === 'SHOW_EXAMS_LIST_ROLE'
      )||
      (this.permissions.some(
        (role: any) => role.authority === 'DASHBOARD_ROLE'
      )
      )
    )) {
    this.examService.getAllExams().subscribe((exams: Exam[]) => {
      this.totalExams = exams.length;
    });

  }else {
    this.totalExams = 100;
  }


    if (
      this.permissions.some(
        (role: any) => role.authority === 'SHOW_ALL_STUDENTS_ROLE'
      )
    ) {
      this.studentService.getAllStudents().subscribe((students: any[]) => {
        this.totalStudents = students.length;
      });
    }else {
      this.totalStudents = 100;
    }


    this.courseService.getAllCourses().subscribe((courses: any[]) => {
      this.totalCourses = courses.length;
    });
    this.teacherService.getAllAdmins().subscribe((teachers: any[]) => {
      this.totalTeachers = teachers.length;
    });
  }
}
