import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from '../Models/question';
import { coding } from './../Models/codingQuestion';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
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

  saveQuestions(questions: any[], id: number): Observable<any[]> {
    return this.httpClient
      .post<any[]>(`${environment.APPURL}/exam/saveStandardQuestions/${id}`,
        JSON.stringify(questions),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  getQuestions(examId: number): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`${environment.APPURL}/exam/getStandardQuestions/${examId}`).
      pipe(retry(2), catchError(this.handleError))
  }
  deleteQuestion(question: Question) {
    return this.httpClient
      .delete(`${environment.APPURL}/exam/deleteStandardQuestion`, { body: question })
      .pipe(retry(2), catchError(this.handleError))
      .subscribe((data) => { });
  }

  deleteOptions(options: any[]) {
    return this.httpClient
      .delete(`${environment.APPURL}/exam/deleteStandardQuestionAnswer`, { body: options })
      .pipe(retry(2), catchError(this.handleError))
      .subscribe((data) => { });
  }
  // question Coding
  addCodeQuestion(questions:coding[]):Observable<coding[]>{
    return this.httpClient.post<coding[]>(`${environment.APPURL}/codeProblems`,this.httpOption).
    pipe(retry(2), catchError(this.handleError));
  }
  getCodeQuestionByExamId(ExamId:number):Observable<coding[]>{
    return this.httpClient.get<coding[]>(`${environment.APPURL}/codeProblems/${ExamId}`).
    pipe(retry(2), catchError(this.handleError));
  }
  deleteCodeQuestionById(id:number):Observable<coding[]>{
    return this.httpClient.delete<coding[]>(`${environment.APPURL}/codeProblems/${id}`).
    pipe(retry(2), catchError(this.handleError));
  }



  openSnackBar(message: string) {
    this._snackBar.open(message + ' sucessfully', 'close', {
      duration: 3000,
    });
  }
}
