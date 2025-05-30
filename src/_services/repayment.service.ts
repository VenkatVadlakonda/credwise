import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepaymentService {
  LoanBankStatements = [
    {
      loanApplicationId: 1,
      userId: 3,
      gender: 'Female',
      dob: '1998-04-12',
      aadhaar: '123456781234',
      address: '45 Jubilee Hills, Hyderabad',
      income: 650000.0,
      employmentType: 'Salaried',
      loanProductId: 1,
      requestedAmount: 400000.0,
      requestedTenure: 36,
      interestRate: 9.5,
      status: 'In Processing',
      decisionDate: '2025-05-25T10:00:00',
      decisionReason: 'Under final review.',
      isActive: true,
      createdAt: '2025-05-10T09:00:00',
      createdBy: 'Customer',
      modifiedAt: '2025-05-25T10:00:00',
      modifiedBy: 'Admin',
      bankStatements: [
        {
          bankStatementId: 1,
          documentName: 'siri_bank_statement_march.pdf',
          documentPath: '/documents/siri_bank_statement_march.pdf',
          status: 'Verified',
          rejectionReason: '',
          verifiedBy: 1,
          verifiedAt: '2025-05-25T15:30:00',
          isActive: true,
          createdAt: '2025-05-20T10:00:00',
          createdBy: 'Customer',
          modifiedAt: '2025-05-25T15:30:00',
          modifiedBy: 'Admin',
        },
      ],
    },
    {
      loanApplicationId: 2,
      userId: 4,
      gender: 'Male',
      dob: '1992-11-01',
      aadhaar: '567812345678',
      address: '23 Gachibowli, Hyderabad',
      income: 850000.0,
      employmentType: 'Self-Employed',
      loanProductId: 2,
      requestedAmount: 1000000.0,
      requestedTenure: 60,
      interestRate: 10.0,
      status: 'Initial Review',
      decisionDate: '2025-05-20T14:00:00',
      decisionReason: 'Pending document verification.',
      isActive: true,
      createdAt: '2025-05-15T09:00:00',
      createdBy: 'Customer',
      modifiedAt: '2025-05-20T14:00:00',
      modifiedBy: 'Customer',
      bankStatements: [
        {
          bankStatementId: 2,
          documentName: 'phani_bank_statement_april.pdf',
          documentPath: '/documents/phani_bank_statement_april.pdf',
          status: 'Rejected',
          rejectionReason: 'Blurred image. Please upload a clearer copy.',
          verifiedBy: 5,
          verifiedAt: '2025-05-21T16:00:00',
          isActive: true,
          createdAt: '2025-05-20T08:30:00',
          createdBy: 'Customer',
          modifiedAt: '2025-05-21T16:00:00',
          modifiedBy: 'Admin',
        },
      ],
    },
  ];

  constructor(private http: HttpClient) {}

  getBankStmts(): Observable<any> {
    return of(this.LoanBankStatements);
  }
  // In RepaymentService
  submitForVerification(documentId: number): Observable<any> {
    // Simulate API response
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Document submitted for verification',
          timestamp: new Date().toISOString(),
        });
        observer.complete();
      }, 1000); // Simulate network delay
    });
  }
  showSuccess(message: string) {
    return message;
  }

  postEmi(data: any): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7194/api/LoanRepayments/generate-emi-plan',
      data
    );
  }

  // Get all repayments for a loan application
  getRepaymentsByLoanId(loanApplicationId: number): Observable<any> {
    return this.http.get<any>(
      `https://localhost:7194/api/LoanRepayments/loan/${loanApplicationId}`
    );
  }

  // Apply penalty to a repayment
  applyPenalty(repaymentId: number): Observable<any> {
    return this.http.post<any>(
      `https://localhost:7194/api/LoanRepayments/apply-penalty/${repaymentId}`,
      {}
    );
  }
}
