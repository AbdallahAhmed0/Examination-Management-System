import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../Model/user';
import { Role } from '../../roles/Models/role';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOption;

  private handleError(error: HttpErrorResponse) {
    // Generic Error handler
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      // Return an observable with a user-facing error message.
    return throwError(
      ()=>new Error('Error occured, please try again')
    )

    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        return throwError(
          ()=>new Error(error.error.message)
        )

    }
  }



  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
      private router: Router,
      private http: HttpClient) {

        this.httpOption = {
          headers: new HttpHeaders({
          'Content-Type': 'application/json'

          })
        };
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
  }

  public get userValue() {
      return this.userSubject.value;
  }

  login(email: string, password: string):Observable<any> {
    // return this.http.post<any>(`${environment.APPURL}/auth/login`,JSON.stringify({email:email,password:password}),this.httpOption )
    
    return this.http.post<any>(`http://142.93.192.45:8088/api/auth/login`,JSON.stringify({email:email,password:password}),this.httpOption )
        .pipe( retry(2),
        catchError(this.handleError));
  }
  logout() {
      // return this.http.post<any>(`${environment.APPURL}/auth/logout`,this.httpOption )

      return this.http.post<any>(`http://142.93.192.45:8088/api/auth/logout`,this.httpOption )
      .pipe( retry(2),
      catchError(this.handleError));
  }
}
