import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersService, JWTUser } from '../../../fastapi';

export const LS_KEY_AUTH_TOKEN = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceFE {
  private _user$ = new BehaviorSubject<JWTUser | null>(null);
  user$: Observable<JWTUser | null> = this._user$.asObservable();

  constructor(private usersService: UsersService) {
    this.loadUserFromLocalStorage();
  }

  private loadUserFromLocalStorage() {
    const token = localStorage.getItem(LS_KEY_AUTH_TOKEN);
    if (token) {
      const user = this.decodeToken(token);
      this._user$.next(user);
    }
  }

  async setSession(authToken: string) {
    if (!authToken) {
      return this.cleanLocalStorage();
    }

    const user = this.decodeToken(authToken);
    localStorage.setItem(LS_KEY_AUTH_TOKEN, authToken);

    this.usersService.usersControllerGetUser().subscribe({
      next: (userProfile) => {
        this._user$.next(userProfile);
      },
      error: (err) => console.error('Error fetching test profile:', err),
    });
  }

  decodeToken(token: string): JWTUser {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }

  cleanLocalStorage() {
    localStorage.removeItem(LS_KEY_AUTH_TOKEN);
    this._user$.next(null);
  }

  isLoggedIn() {
    return !!this._user$.getValue();
  }
}
