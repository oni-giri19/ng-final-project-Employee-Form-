import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ENVIRONMENT } from 'src/environment/environment';
import { LoginCredentials, User } from 'src/types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = ENVIRONMENT.authUrl;

  private loading$ = new BehaviorSubject<boolean>(false);
  private errorMsg$ = new BehaviorSubject<string>('');
  private user$ = new BehaviorSubject<User | null>(null);

  get loading() {
    return this.loading$.asObservable();
  }

  get errorMsg() {
    return this.errorMsg$.asObservable();
  }

  get user() {
    return this.user$.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {}

  init() {
    const token = localStorage.getItem(ENVIRONMENT.tokenKey);
    if (!token) {
      this.signOut();
      this.router.navigate(['/']);
    }
    const user = localStorage.getItem(ENVIRONMENT.userKey);
    if (user) {
      this.user$.next(JSON.parse(user));
    }
  }
  //Sign in logic using dummyjson.com AUTH feature
  signIn(credentials: LoginCredentials) {
    return this.http.post<User>(`${this.authUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        this.user$.next(response);
        localStorage.setItem(ENVIRONMENT.userKey, JSON.stringify(response));
        localStorage.setItem(ENVIRONMENT.tokenKey, response.token);
        this.router.navigate(['/main']);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        this.errorMsg$.next(errorResponse.error.message);

        return of(false);
      })
    );
  }
  //Sign out logic
  signOut() {
    localStorage.removeItem(ENVIRONMENT.userKey);
    localStorage.removeItem(ENVIRONMENT.tokenKey);
    this.user$.next(null);
  }

  // getUserId() {
  //   const userStr = localStorage.getItem(ENVIRONMENT.userKey);
  //   if (userStr) {
  //     const user = JSON.parse(userStr) as User;
  //     return user.id;
  //   }
  //   return null;
  // }
}
