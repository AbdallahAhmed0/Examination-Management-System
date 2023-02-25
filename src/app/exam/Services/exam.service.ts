import { Exam } from './../Models/exam';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class ExamService {
  httpOption;

  constructor(private httpClient: HttpClient,
              private _snackBar: MatSnackBar) {
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

  getAllExams(): Observable<Exam[]> {
    return this.httpClient
      .get<Exam[]>(`${environment.APPURL}/exam/getAll`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getExamById(id: number): Observable<Exam> {
    return this.httpClient
      .get<Exam>(`${environment.APPURL}/exams/get/${id}`, this.httpOption)
      .pipe(retry(2), catchError(this.handleError));
  }

  addExam(exam: Exam): Observable<Exam> {
    return this.httpClient
      .post<Exam>(
        `${environment.APPURL}/exam/save`,
        JSON.stringify(exam),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  updateExam(exam: Exam): Observable<Exam> {
    return this.httpClient
      .post<Exam>(
        `${environment.APPURL}/exam/save`,
        JSON.stringify(exam),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteExam(id: number) {
    this.httpClient
      .delete(`${environment.APPURL}/exam/delete/${id}`)
      .pipe(retry(2), catchError(this.handleError))
      .subscribe((data) => {});
  }

  // openSnackBar(message: string) {
  //   this._snackBar.open(message + ' sucessfully', 'close', {
  //     duration: 3000,
  //   });
  // }
}
