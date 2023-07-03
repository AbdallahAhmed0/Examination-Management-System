import { Course } from './../course/course.model';
import { Injectable } from '@angular/core';
import { CourseService } from '../course/course.service';
import { Observable } from 'rxjs';
import { Exam } from '../exam/Models/exam';
import { Student } from '../students/Models/student';

@Injectable({
  providedIn: 'root'
})
export class CourseSharedServiceService {


  constructor(private courseService: CourseService) { }

  getCoursesByAdminId(adminId: number): Course[] {
    let courses: Course[] = [];
    this.courseService.getCoursesByAdminId(adminId).subscribe( data => {
      courses.push(...data);
    });
    return courses;
  }

  getExamsForCourses(courses: Course[]): Exam[] {
    let exams: Exam[] = [];
    for (let course of courses) {
      let courseId: number = course.id? course.id : 0;
      this.courseService.getExamsForCourse(courseId).subscribe( data => {
        exams.push(...data);
      });
    }
    return exams;
  }

  getStudentsByCourseId(courseId: number): Student[] {
    let students: Student[] = [];
    this.courseService.getStudentsByCourseId(courseId).subscribe( data => {
      students.push(...data);
    });
    return students;
  }
}
