import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Admin } from '../_models/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  

  constructor(private http: HttpClient) {}

  loginData(admin: { email: string; password: string }): Observable<Admin> {
    return this.http.post<Admin>(
      'https://localhost:7194/api/Auth/login',
      admin
    );
  }
}
