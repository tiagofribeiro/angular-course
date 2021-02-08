import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCg3hRxXL-IPQdHzuICVeylS2BYidYj71M',
        {
          'email': email,
          'password': password,
          'returnSecureToken': true
        }
      ).pipe(catchError(this.handleError), tap(resData => this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCg3hRxXL-IPQdHzuICVeylS2BYidYj71M',
        {
          'email': email,
          'password': password,
          'returnSecureToken': true
        }
      ).pipe(catchError(this.handleError), tap(resData => this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "Ocorreu um erro!";
    if (!errorResponse.error || !errorResponse.error.error)
      return throwError(errorMessage);
    switch (errorResponse.error.error.message) {
      case ('EMAIL_EXISTS'):
        errorMessage = "Este email já existe!";
      case ('EMAIL_NOT_FOUND'):
        errorMessage = "Não existe um usuário com este email!";
      case ('INVALID_PASSWORD'):
        errorMessage = "Senha inválida!";
    }
    return throwError(errorMessage);
  }
}
