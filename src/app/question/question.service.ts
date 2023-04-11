import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from './question';

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

  saveQuestions(questions: any[],id:number): Observable<any[]> {
    return this.httpClient
      .post<any[]>( `${environment.APPURL}/exam/saveQuestions/${id}`,
        JSON.stringify(questions),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  getQuestions(examId:number):Observable<Question[]>{
    return this.httpClient.get<Question[]>(`${environment.APPURL}/exam/getQuestions/${examId}`).
    pipe(retry(2),catchError(this.handleError))
  }
  deleteQuestion(question:Question){
    return this.httpClient
    .delete(`${environment.APPURL}/exam/deleteQuestion`, { body: question })
    .pipe(retry(2), catchError(this.handleError))
    .subscribe((data) => {});
  }

  openSnackBar(message: string) {
    this._snackBar.open(message + ' sucessfully', 'close', {
      duration: 3000,
    });
  }
}
