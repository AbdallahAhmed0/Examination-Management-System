import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, interval } from 'rxjs';


const USER_KEY = 'auth-user';
const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  private loggedInSubject: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  constructor(private route:Router) {
    // Initialize the loggedInSubject and loggedIn$ with the saved login status
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.loggedIn$ = this.loggedInSubject.asObservable();
  }

  clean(): void {
    window.sessionStorage.clear();
    this.loggedInSubject.next(false);
  }

  public saveUser(user: any, token: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.setItem(TOKEN, JSON.stringify(token));
    this.loggedInSubject.next(true);

    this.startExpirationTimer();

  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getToken(): any {
    const token = window.sessionStorage.getItem(TOKEN);
    if (token) {
      return JSON.parse(token);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
 // save attempt Data
  saveAttemptData(data:any){
    window.localStorage.removeItem('AttEMPT_DATA');
    window.localStorage.setItem('AttEMPT_DATA', JSON.stringify(data));

  }
  getAttemptData():any {
    return window.localStorage.getItem('AttEMPT_DATA');
  }
  removeAttemptData(){
    window.localStorage.removeItem('AttEMPT_DATA');
  }
     //////////////////////////////////////////////////
     // Check Expired User
  private tokenPayload: any = this.getUser();
  private intervalId:any;


  startExpirationTimer() {
    let expirationTime:number;

    const storedexpirationTime = localStorage.getItem('expirationTime');
    if (storedexpirationTime) {
      expirationTime = Number(storedexpirationTime);
    } else {
      expirationTime = parseInt(this.tokenPayload.exp, 10) * 1000;// Convert expiration time to milliseconds
      localStorage.setItem('expirationTime', expirationTime.toString());
    }

    this.intervalId = setInterval(() => {
        if (expirationTime <= Date.now()) {
          // logout
          this.clean();
          this.route.navigate(['/login'])
          clearInterval(this.intervalId);
        }
      }, 1000);
    }

}
