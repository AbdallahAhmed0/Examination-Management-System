import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Students } from '../Models/student';

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
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Write error details in Generic error log

    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Error occured, please try again'));
  }

  constructor(private httpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getAllStudents(): Observable<Students[]> {
    return this.httpClient
      .get<Students[]>(`${environment.APPURL}/students/getAll`)
      .pipe(retry(2), catchError(this.handleError));
  }
  getStudentById(id: number): Observable<Students> {
    return this.httpClient
      .get<Students>(
        `${environment.APPURL}/students/get/${id}`,
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  addStudent(student: Students): Observable<Students> {
    return this.httpClient
      .post<Students>(
        `${environment.APPURL}/students/add`,
        JSON.stringify(student),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  updateStudents(student: Students): Observable<Students> {
    return this.httpClient
      .post<Students>(
        `${environment.APPURL}/students/update`,
        JSON.stringify(student),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteStudent(id: number) {
    this.httpClient
      .delete(`${environment.APPURL}/students/delete/${id}`)
      .pipe(retry(2), catchError(this.handleError))
      .subscribe((data) => {});
  }
}
