import { MatSnackBar } from '@angular/material/snack-bar';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../Models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  httpOption;

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

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getAllStudents(): Observable<Student[]> {
    return this.httpClient
      .get<Student[]>(`${environment.APPURL}/students/getAll`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getStudentById(id: number): Observable<Student> {
    return this.httpClient
      .get<Student>(`${environment.APPURL}/students/get/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  addStudent(student: Student): Observable<Student> {
    return this.httpClient
      .post<Student>(
        `${environment.APPURL}/students/add`,
        JSON.stringify(student),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  updateStudents(student: Student): Observable<Student> {
    return this.httpClient
      .post<Student>(
        `${environment.APPURL}/students/update`,
        JSON.stringify(student),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteStudent(id: number) {
    return this.httpClient
      .delete(`${environment.APPURL}/students/delete/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
  getGroups(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${environment.APPURL}/groups/getAll`)
      .pipe(retry(2), catchError(this.handleError));
  }

  openSnackBar(message: string) {
    this._snackBar.open(message + ' sucessfully', 'close', {
      duration: 3000,
    });
  }
}
