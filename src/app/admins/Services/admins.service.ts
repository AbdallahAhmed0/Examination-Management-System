import { StorageServiceService } from 'src/app/login/Services/storage-service.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { Admin } from './../Models/admin';
import { environment } from './../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
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

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

  }

  getAllAdmins(): Observable<Admin[]> {

      return this.httpClient
        .get<Admin[]>(`${environment.APPURL}/admins/getAll`)
        .pipe(retry(2), catchError(this.handleError));
  }

  getAdminById(id: number): Observable<Admin> {
    // if (
    //   this.permissions.some(
    //     (role: any) => role.authority === 'MANAGE_ADMIN_ROLE'
    //   ) ||
    // (this.permissions.some((role: any) => role.authority === 'SHOW_PROFILE_ROLE'))
    //   ||
    // (this.permissions.some(
    //   (role: any) => role.authority === 'MANAGE_ROLE'))
    //   )
    //   {
      return this.httpClient
        .get<Admin>(`${environment.APPURL}/admins/get/${id}`)
        .pipe(retry(2), catchError(this.handleError));
    // } else {
    //   // User does not have permission to view admin details
    //   const error = new Error(
    //     'User does not have permission to view admin details'
    //   );
    //   console.error(error);
    //   throw error;
    // }
  }

  addAdmin(admin: Admin): Observable<Admin> {
    // if (
    //   this.permissions.some(
    //     (role: any) => role.authority === 'MANAGE_ADMIN_ROLE'
    //   ) ||
    // (this.permissions.some((role: any) => role.authority === 'SHOW_PROFILE_ROLE'))
    //   ||
    // (this.permissions.some(
    //   (role: any) => role.authority === 'MANAGE_ROLE'))
    //   ) {
    return this.httpClient
      .post<Admin>(
        `${environment.APPURL}/admins/add`,
        JSON.stringify(admin),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
    // } else {
    //   // User does not have permission to view admin details
    //   const error = new Error(
    //     'User does not have permission to add admin'
    //   );
    //   console.error(error);
    //   throw error;
    // }
  }

  updateAdmin(admin: Admin): Observable<Admin> {
    // if (
    //   this.permissions.some(
    //     (role: any) => role.authority === 'MANAGE_ADMIN_ROLE'
    //   ) ||
    // (this.permissions.some((role: any) => role.authority === 'SHOW_PROFILE_ROLE'))
    //   ||
    // (this.permissions.some(
    //   (role: any) => role.authority === 'MANAGE_ROLE'))
    //   ) {
    return this.httpClient
      .post<Admin>(
        `${environment.APPURL}/admins/update`,
        JSON.stringify(admin),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
    // } else {
    //   // User does not have permission to view admin details
    //   const error = new Error(
    //     'User does not have permission to update admin'
    //   );
    //   console.error(error);
    //   throw error;
    // }
  }

  deleteAdmin(id: number) {
    // if (
    //   this.permissions.some(
    //     (role: any) => role.authority === 'MANAGE_ADMIN_ROLE'
    //   ) ||
    // (this.permissions.some((role: any) => role.authority === 'SHOW_PROFILE_ROLE'))
    //   ||
    // (this.permissions.some(
    //   (role: any) => role.authority === 'MANAGE_ROLE'))
    //   ) {
    return this.httpClient
      .delete(`${environment.APPURL}/admins/delete/${id}`)
      .pipe(retry(2), catchError(this.handleError));
    // } else {
    //   // User does not have permission to view admin details
    //   const error = new Error(
    //     'User does not have permission to delete admin'
    //   );
    //   console.error(error);
    //   throw error;
    // }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message + ' sucessfully', 'close', {
      duration: 3000,
    });
  }
}
