import { Answer, Exam } from './../Models/exam';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionAnswer } from '../Models/question-answer-interface';
@Injectable({
  providedIn: 'root',
})
export class ExamService {
  httpOption;
  variableSubject = new BehaviorSubject<boolean>(false);

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
   //////////////////////////////////////////
  // CRUD of Exam
  getAllExams(): Observable<Exam[]> {
    return this.httpClient
      .get<Exam[]>(`${environment.APPURL}/exam/getAllExams`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getExamById(id: number): Observable<Exam> {
    return this.httpClient
      .get<Exam>(`${environment.APPURL}/exam/getExam/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveExam(exam: Exam): Observable<Exam> {
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
      .pipe(retry(2), catchError(this.handleError));
  }

  /////////////////////////////////////////////////////
  // Attempt Exam
  attemptExam(examId: number, userId: number) {

    return this.httpClient
      .post(
        `${environment.APPURL}/exam/attemptExam/${examId}/${userId}`,
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  testExam(examId: number, userId: number) {

    return this.httpClient
      .post(
        `${environment.APPURL}/exam/testExam/${examId}/${userId}`,
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  renderExam(id: number): Observable<any> {
    return this.httpClient
      .get<Exam>(`${environment.APPURL}/exam/renderExam/${id}`, this.httpOption)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllAttemptsByUserId(userId:number):Observable<any[]>{
    return this.httpClient
    .get<any[]>(`${environment.APPURL}/exam/attempts/${userId}`, this.httpOption)
    .pipe(retry(2), catchError(this.handleError));
}
getAllUsersAttemptExam(examId:number):Observable<any[]>{
  return this.httpClient
  .get<any[]>(`${environment.APPURL}/exam/usersAttemptedExam/${examId}`, this.httpOption)
  .pipe(retry(2), catchError(this.handleError));
}
  endExam(examAttemptId: number): Observable<any> {

    return this.httpClient.post(`${environment.APPURL}/exam/endExam/${examAttemptId}`, {})
      .pipe(retry(2), catchError(this.handleError));
  }

  ////////////////////////////////////////////
  // Answers Of Exam
  getAllExamAnswers(examAttemptId: number): Observable<QuestionAnswer[]> {
    return this.httpClient
      .get<QuestionAnswer[]>(
        `${environment.APPURL}/exam/getAllStudentAnswers/${examAttemptId}`,
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  createResult(examAttemptId: number): Observable<any> {

    return this.httpClient.post(`${environment.APPURL}/exam/createResult/${examAttemptId}`, {})
      .pipe(retry(2), catchError(this.handleError));
  }
  getResult(attemptId: number): Observable<any> {
    return this.httpClient
      .get(`${environment.APPURL}/exam/getResult/${attemptId}`, this.httpOption)
      .pipe(retry(2), catchError(this.handleError));
  }
  getStatusCode(attemptId:number,questionId:number):Observable<any> {
    return this.httpClient
      .get(`${environment.APPURL}/exam/getCodeStatus/${attemptId}/${questionId}`, this.httpOption)
      .pipe(retry(2), catchError(this.handleError));
  }

     /////////////////////////////////////////////////
     // Save Solution of Questions
  saveSelectedStudentAnswer(attemptId: number, answers: { questionId: number; answersIds: number[] }[]): Observable<any> {

    return this.httpClient.post<any>(`${environment.APPURL}/exam/saveSelectedStudentAnswer/${attemptId}`,
      JSON.stringify(answers), this.httpOption)
      .pipe(retry(2), catchError(this.handleError));
  }
  saveCompleteStudentAnswer(attemptId: number, answers: { questionId: number; textAnswer: string }[]): Observable<any> {

    return this.httpClient.post<any>(`${environment.APPURL}/exam/saveCompleteStudentAnswer/${attemptId}`,
      JSON.stringify(answers), this.httpOption)
      .pipe(retry(2), catchError(this.handleError));
  }
  saveJudgeCodeQuestion(attemptId: number, questionId: number, language: string, code: string): Observable<any> {
    const params = new HttpParams()
      .set('attemptId', attemptId.toString())
      .set('questionId', questionId.toString())
      .set('language', language)
      .set('code', code);

    return this.httpClient.post<any>(`${environment.APPURL}/exam/judgeCodeQuestion`, null, { params: params })
      .pipe(retry(2), catchError(this.handleError));
  }

  openSnackBar(message: string) {
    this._snackBar.open(message + ' sucessfully', 'close', {
      duration: 3000,
    });
  }

}
