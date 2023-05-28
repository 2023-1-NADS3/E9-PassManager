import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { signUpUserDTO } from '../DTOs/signUpUserDTO';
import { signInUserDTO } from '../DTOs/signInUserDTO';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

interface AuthResponse {
  username: string;
  email: string;
  password: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = `${environment.url}/users`;
  }

  signUp(input: signUpUserDTO) {
    return this.http.post<AuthResponse>(`${this.url}/create`, input).pipe(
      map((data) => {
        sessionStorage.setItem('token', data.token);
        return data;
      })
    );
  }

  signIn(input: signInUserDTO) {
    return this.http.post<AuthResponse>(`${this.url}/auth`, input).pipe(
      map((data) => {
        sessionStorage.setItem('token', data.token);
        return data;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/auth/sign-in']);
  }

  isAuthenticated() {
    return !!sessionStorage.getItem('token');
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  getUserIdFromToken() {
    const decodedToken: any = jwt_decode(sessionStorage.getItem('token')!);
    return decodedToken.sub.userId;
  }
}
