import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LoanApplication } from '../_models/loans.model';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  // private url = 'http://localhost:3000/LoanApplications';

  constructor(private http: HttpClient) {}
  // getEmiPlans() {
  //   return this.emiPlans;
  // }
  // getLoansData(): Observable<any> {
  //   return of(this.LoanApplication);
  // }
  getAllLoans(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(
      'https://localhost:7194/api/LoanApplication/all'
    );
  }
  private urls = 'https://localhost:7194/api/LoanRepayments/loan';
  getLoanById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urls}/${id}`);
  }

  getAllLoanApi(): Observable<any> {
    return this.http.get<any>('https://localhost:7194/api/LoanApplications');
  }

  addLoan(loanData: any): Observable<any> {
    return this.http.post(
      'https://localhost:7194/api/LoanApplications',
      loanData
    );
  }

  uploadDocuments(loanId: number, formData: FormData): Observable<any> {
    return this.http.post(
      `https://localhost:7194/api/LoanApplications/${loanId}/upload-documents`,
      formData
    );
  }

  // createEmiPlan(emiData: any): Observable<any> {
  //   const newEmiPlan = {
  //     emiPlanId: this.emiPlans.length + 1,
  //     ...emiData,
  //     status: 'Active',
  //     totalAmount: emiData.monthlyEmi * emiData.tenureInMonths,
  //     remainingAmount: emiData.monthlyEmi * emiData.tenureInMonths,
  //     nextPaymentDate: new Date(emiData.startDate).toISOString().split('T')[0],
  //     paymentHistory: [],
  //   };

  //   this.emiPlans.push(newEmiPlan);
  //   return of(newEmiPlan);
  // }

  addFineToEmi(emiId: number, fine: number): Observable<any> {
    return this.http.patch(`/api/emis/${emiId}/add-fine`, { fine });
  }

  generateEMIPlan(loanId: number, emiData: any) {
    return this.http.post(
      `/api/loanApplications/${loanId}/generate-EMI-plan`,
      emiData
    );
  }

  getRepaymentPlan(loanId: number): Observable<any> {
    return this.http.get<any>(`/api/loans/${loanId}/repayment-plan`);
  }

  updateLoanStatus(loanApplicationId: number, status: string): Observable<any> {
    return this.http.patch(
      `http://localhost:3000/LoanApplications/${loanApplicationId}`,
      { status }
    );
  }
}
