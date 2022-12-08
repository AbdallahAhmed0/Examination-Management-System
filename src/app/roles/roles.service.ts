import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from './role';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  httpOption;

  constructor( private http:HttpClient) {
    this.httpOption={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    }

  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>(`${environment.APPURL}/roles/getAll`);


  }
  addRole(role:Role){
    this.http.post<Role>(`${environment.APPURL}/roles/add`, JSON.stringify(role),this.httpOption).subscribe()
    console.log(role);
    window.location.reload();

  }
  deleteRole(id :number){
    this.http.delete(`${environment.APPURL}/roles/delete/${id}`).subscribe()
    alert("deleted succesfully");
    window.location.reload();

  }
}
