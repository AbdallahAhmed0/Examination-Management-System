import { Injectable } from '@angular/core';
import { CourseService } from '../course/course.service';
import { Course } from '../course/course.model';
import { Observable } from 'rxjs';
import { Exam } from '../exam/Models/exam';
import { Student } from '../students/Models/student';

@Injectable({
  providedIn: 'root'
})
export class CourseSharedServiceService {

  constructor(private courseService: CourseService) { }

  getCoursesByAdminId(adminId: number): Observable<Course[]> {
    return this.courseService.getCoursesByAdminId(adminId);
  }

  getExamsForCourse(courseId: number): Observable<Exam[]> {
    return this.courseService.getExamsForCourse(courseId);
  }

  getStudentsByCourseId(courseId: number): Observable<Student[]> {
    return this.courseService.getStudentsByCourseId(courseId);
  }
}
