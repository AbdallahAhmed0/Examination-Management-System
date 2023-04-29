import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {

  }
  ProceedLogin(UserCred:any){
    return this.http.post(`${environment.APPURL}/login`,UserCred);
  }
  IsLoggedIn(){
    return localStorage.getItem('token') != null;
  }
  GetToken(){
    return localStorage.getItem('token') || '';
  }
  HaveAccess(){
    var loggintoken=localStorage.getItem('token')||'';
    var _extractedtoken=loggintoken.split('.')[1];
    var _atobdata=atob(_extractedtoken);
    var _finaldata=JSON.parse(_atobdata);
    if(_finaldata.role=='admin'){
      return true
    }else{
      alert('you not having access');
      return false
    }
  }
}
