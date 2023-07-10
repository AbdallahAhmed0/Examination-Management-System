import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Course } from "./course.model"
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Exam } from '../exam/Models/exam';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  httpOption;

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }


  private handleError(error: HttpErrorResponse) {
    // Generic Error handler
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('Error occured, please try again'));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      return throwError(() => new Error(error.error.message));
    }
  }
  getAllCourses(): Observable<Course[]> {
    return this.httpClient
      .get<Course[]>(`${environment.APPURL}/courses/getAll`)
      .pipe(retry(2), catchError(this.handleError));
  }
  getGroups(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${environment.APPURL}/groups/getAll`)
      .pipe(retry(2), catchError(this.handleError));
  }
  saveCourse(course: Course): Observable<Course> {
    return this.httpClient
      .post<Course>(
        `${environment.APPURL}/courses/add`,
        JSON.stringify(course),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteCourse(id: number) {
    return this.httpClient
      .delete(`${environment.APPURL}/courses/delete/${id}`)

      .pipe(retry(2), catchError(this.handleError));
  }
  getExamsofCourse(id: number): Observable<Exam[]> {
    return this.httpClient
      .get<Exam[]>(`${environment.APPURL}/exam/getAllCourseExams/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
  getCourseById(id: number): Observable<Course> {
    return this.httpClient
      .get<Course>(`${environment.APPURL}/courses/get/${id}`, this.httpOption)
      .pipe(retry(2), catchError(this.handleError));
  }

  openSnackBar(message: string) {
    this._snackBar.open(message + ' sucessfully', 'close', {
      duration: 3000,
    });
  }


}
