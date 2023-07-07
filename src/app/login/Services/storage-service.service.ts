import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


const USER_KEY = 'auth-user';
const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  private loggedInSubject: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  constructor() {
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
}
