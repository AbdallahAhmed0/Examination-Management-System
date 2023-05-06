import { Answer, Exam } from './../Models/exam';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class ExamService {
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

  getAllExams(): Observable<Exam[]> {
    return this.httpClient
      .get<Exam[]>(`${environment.APPURL}/exam/getAll`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getExamById(id: number): Observable<Exam> {
    return this.httpClient
      .get<Exam>(`${environment.APPURL}/exam/${id}`, this.httpOption)
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

  deleteExam(exam: Exam) {
    return this.httpClient
      .delete(`${environment.APPURL}/exam/delete`, { body: exam })
      .pipe(retry(2), catchError(this.handleError))
      .subscribe((data) => {});
  }

  openSnackBar(message: string) {
    this._snackBar.open(message + ' sucessfully', 'close', {
      duration: 3000,
    });
  }

  // Attempt Exam
  attemptExam(examId: number, userId: number) {
    
    return this.httpClient
      .post(
        `${environment.APPURL}/exam/attemptExam/${examId}/${userId}`,
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  renderExam(id: number): Observable<any> {
    return this.httpClient
      .get<Exam>(`${environment.APPURL}/exam/renderExam/${id}`, this.httpOption)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveSelectedStudentAnswer(
    attemptId: number,
    answers: { questionId: number; answersIds: number[] }[]
  ): Observable<any> {
    const url = `${environment.APPURL}/saveSelectedStudentAnswer/${attemptId}`;
    return this.httpClient.post<any>(url, { answers });
  }

  saveCompleteStudentAnswer(
    attemptId: number,
    answers: { questionId: number; textAnswer: string }[]
  ): Observable<any> {
    const url = `${environment.APPURL}/saveCompleteStudentAnswer/${attemptId}`;
    return this.httpClient.post<any>(url, { answers });
  }

  endExam(examAttemptId: string): Observable<any> {
    const url = `/exam/endExam/${examAttemptId}`;
    return this.httpClient
      .post(url, {})
      .pipe(retry(2), catchError(this.handleError));
  }
}
