import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanProduct } from '../_models/loans.model';


@Injectable({
  providedIn: 'root'
})
export class LoanProductService {
  private apiUrl = 'https://localhost:7001/api/LoanProduct';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LoanProduct[]> {
    return this.http.get<LoanProduct[]>(this.apiUrl);
  }

  update(id: number, data: any): Observable<LoanProduct> {
    return this.http.put<LoanProduct>(`${this.apiUrl}/${id}`, data);
  }

  deactivate(id: number): Observable<LoanProduct> {
    return this.http.delete<LoanProduct>(`${this.apiUrl}/${id}`);
  }

  getById(id: number):Observable<LoanProduct> {
    return this.http.get<LoanProduct>(`${this.apiUrl}/${id}`);
  }

  getPersonalLoanById(id: number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updatePersonalLoan(id: number, data: any):Observable<any> {
    return this.http.put<any>(`https://localhost:7001/api/LoanProduct/personal/${id}`, data);
  }
  getHomeLoanById(id: number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  } 
  updateHomeLoan(id: number, data: any):Observable<any> {
    return this.http.put<any>(`https://localhost:7001/api/LoanProduct/home/${id}`, data);
  } 
  getGoldLoanById(id: number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateGoldLoan(id: number, data: any):Observable<any> {
    return this.http.put<any>(`https://localhost:7001/api/LoanProduct/gold/${id}`, data);
  } 
  
}