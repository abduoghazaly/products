import { Injectable, signal } from '@angular/core';
import { User } from '../model/user';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = signal<User>({
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    image: '',
    gender: '',
    token: '',
    refreshToken: '',
  });

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http
      .post('https://dummyjson.com/auth/login', user)
      .pipe(tap((e) => this.user.set(e as User)));
  }
}
