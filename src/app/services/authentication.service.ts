import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { map } from 'rxjs/internal/operators/map';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  //private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  comunidade: Observable<any>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.comunidade = new BehaviorSubject(
      JSON.parse(localStorage.getItem('comunidade'))
    ).asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string, nome: string, email: string) {
    return this.http
      .post<any>(`${environment.apiBaseUrl}/users/authenticate`, {
        username,
        password,
        nome,
        email,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.http
            .get(`${environment.apiBaseUrl}/comunidade/comunidade`)
            .subscribe((comunidade) => {
              localStorage.setItem('comunidade', JSON.stringify(comunidade));
            });
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  resetPassword(form: FormGroup): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/users/recover`, form);
  }
}
