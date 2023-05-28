import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateUserDTO } from '../DTOs/updateUserDTO';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.url}/users`;
  }

  obtain(id: number) {
    return this.http.get<User>(`${this.url}/getUser/${id}`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  update(id: number, input: UpdateUserDTO) {
    return this.http.put(`${this.url}/update/${id}`, input).pipe(
      map((data) => {
        return data;
      })
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
