import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { Admin } from './../Models/admin';
import { environment } from './../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AdminsService {
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

  constructor(private httpClient:HttpClient,
              private _snackBar: MatSnackBar) {


    this.httpOption = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'

      })
    };

  }

  getAllAdmins():Observable<Admin[]>{
    return this.httpClient.get<Admin[]>(`${environment.APPURL}/admins/getAll`)
    .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  getAdminById(id:number):Observable<Admin>{

    return this.httpClient.get<Admin>(`${environment.APPURL}/admins/get/${id}`,this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );

  }
  addAdmin(admin:Admin):Observable<Admin>{

  return  this.httpClient.post<Admin>(`${environment.APPURL}/admins/add`,JSON.stringify(admin),this.httpOption)
  .pipe(
    retry(2),
    catchError(this.handleError)
  );


  }
  updateAdmin(admin:Admin):Observable<Admin>{

    return  this.httpClient.post<Admin>(`${environment.APPURL}/admins/update`,JSON.stringify(admin),this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
        );


    }
    deleteAdmin(id:number){

      this.httpClient.delete(`${environment.APPURL}/admins/delete/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
    }

    openSnackBar(message: string ) {
      this._snackBar.open(message+" sucessfully","close" ,{
        duration:3000 ,

      });
    }

}
