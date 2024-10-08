import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { StorageService } from './storage.service';

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

    } else if(error.status === 403) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.status);
      // Return an observable with a user-facing error message.
    return throwError(
      ()=>new Error('Email Or Password Is Invalid')
    )
    }else{
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        return throwError(
          ()=>new Error(error.error.message)
        )

    }
  }

  constructor(private http: HttpClient,
              private storageService:StorageService,
              private route:Router) {

        this.httpOption = {
          headers: new HttpHeaders({
          'Content-Type': 'application/json'

          })
        };
      }

  login(email: string, password: string):Observable<any> {
    // return this.http.post<any>(`${environment.APPURL}/auth/login`,JSON.stringify({email:email,password:password}),this.httpOption )

    return this.http.post<any>(`http://142.93.192.45:8087/api/auth/login`,JSON.stringify({email:email,password:password}),this.httpOption )
        .pipe(catchError(this.handleError));
  }
  logout() {
    this.storageService.clean();
    this.route.navigate(['/login'])
  }
}
