import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/admins/Services/admins.service';
import { CourseService } from 'src/app/course/course.service';
import { Exam } from 'src/app/exam/Models/exam';
import { ExamService } from 'src/app/exam/Services/exam.service';
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
  constructor(private examService: ExamService,
    private studentService: StudentsService,
    private courseService: CourseService,
    private teacherService: AdminsService) {

  }

  ngOnInit(): void {
    this.examService.getAllExams().subscribe((exams: Exam[]) => {
      this.totalExams = exams.length;
    });
    this.studentService.getAllStudents().subscribe((students: any[]) => {
      this.totalStudents = students.length;
    });
    this.courseService.getAllCourses().subscribe((courses: any[]) => {
      this.totalCourses = courses.length;
    });
    this.teacherService.getAllAdmins().subscribe((teachers: any[]) => {
      this.totalTeachers = teachers.length;
    });
  }
}
