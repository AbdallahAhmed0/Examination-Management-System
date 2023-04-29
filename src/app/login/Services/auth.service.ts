import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/user';
import { Role } from '../../roles/Models/role';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';
  private user!:User;
  private loggedIn: boolean = false;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  constructor(private http: HttpClient) {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(currentUser ? JSON.parse(currentUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.user);
  }

  hasRole(role: string): boolean {
    return this.currentUserValue?.roles?.find(r => r.role === role) !== undefined;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isUser(): boolean {
    return this.hasRole('user');
  }

  getRoles(): Role[] {
    return this.currentUserValue?.roles;
  }
    // Check if user is logged in
    isLoggedIn(): boolean {
      const currentUser = localStorage.getItem('currentUser');
      const user = JSON.parse(currentUser ? JSON.parse(currentUser) : null);
      if (user && user.token) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
      return this.loggedIn;
    }
  }


