import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, of } from 'rxjs';
import { AdminService } from './admin.service';
import { Admin } from '../_models/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    currentUserSubject = new BehaviorSubject<Admin | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

   tokenSubject = new BehaviorSubject<string | null>(null); 

  private router = inject(Router);
  private adminService = inject(AdminService);

  login(credentials: { email: string; password: string }): Observable<Admin> {
    return this.adminService.loginData(credentials).pipe(
      tap((admin: Admin) => {
        this.currentUserSubject.next(admin);
        this.tokenSubject.next(admin.token); 
        console.log('Stored admin:', admin); 
        console.log('Stored token:', admin.token);
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null); 
    // this.router.navigate(['/signin']);
  }

  getCurrentUser(): Admin | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getToken(): Observable<string | null> {
    console.log(this.tokenSubject.asObservable())
    return this.tokenSubject.asObservable(); 
  }
}
