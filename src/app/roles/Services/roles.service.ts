import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Role } from '../Models/role';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
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
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Write error details in Generic error log

    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Error occured, please try again')
    )
  }


  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message + " sucessfully", "close", {
      duration: 3000,

    });
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.APPURL}/roles/getAll`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  getRoleByID(id: number): Observable<Role> {
    return this.http.get<Role>(`${environment.APPURL}/roles/get/${id}`, this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );

  }

  addRoleWithPrivileges(roleName: string, selectedPrivileges: any[]): Observable<Role> {
    const role: Role = {
      role: roleName,
      privileges: selectedPrivileges.map(privilege => ({ id: privilege.id, name: privilege.name }))
    };
    return this.http.post<Role>(`${environment.APPURL}/roles/add`, role, this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateRoleWithPrivileges(role: Role, selectedPrivileges: any[]): Observable<Role> {
    const updatedRole: Role = {
      ...role,
      privileges: selectedPrivileges.map(privilege => ({ id: privilege.id, name: privilege.name }))
    };
    return this.http.post<Role>(`${environment.APPURL}/roles/update`, updatedRole, this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteRole(id: number) {
    return this.http.delete(`${environment.APPURL}/roles/delete/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError));

  }

  getPrivileges(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.APPURL}/privilege`, this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
