import { Injectable } from '@angular/core';


const USER_KEY = 'auth-user';
const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any,token:any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.setItem(TOKEN, JSON.stringify(token));

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
