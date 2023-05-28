import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { registerAndUpdateCredentialDTO } from '../DTOs/registerAndUpdateCredentialDTO';
import { Credential } from '../models/Credential';

import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CredentialService {
  url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = `${environment.url}/credentials`;
  }

  register(input: registerAndUpdateCredentialDTO) {
    return this.http.post(`${this.url}/create`, input).pipe(
      map((data) => {
        return data;
      })
    );
  }

  obtain(id: number) {
    return this.http.get<Credential>(`${this.url}/getCredential/${id}`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  list() {
    return this.http.get<Credential[]>(`${this.url}/getCredentials`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  update(id: number, input: registerAndUpdateCredentialDTO) {
    return this.http.put(`${this.url}/updateCredential/${id}`, input).pipe(
      map((data) => {
        return data;
      })
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/deleteCredential/${id}`).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
