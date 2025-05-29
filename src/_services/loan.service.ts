import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  emiPlan = [
    {
      title: '3 Months Plan',
      months: 3,
      interestRate: 12,
      description: 'Short-term loan with competitive interest rates',
    },
    {
      title: '6 Months Plan',
      months: 6,
      interestRate: 10.5,
      description: 'Medium-term loan with balanced interest rates',
    },
    {
      title: '12 Months Plan',
      months: 12,
      interestRate: 9.5,
      description: 'Long-term loan with attractive interest rates',
    },
  ];
  LoanApplication = [
    {
      LoanApplicationId: 1,
      UserId: 1,
      Gender: 'Male',
      DOB: '1990-05-15',
      Aadhaar: '123456789012',
      Address: '123, Main Street, Hyderabad, Telangana, 500001',
      Income: 750000.0,
      EmploymentType: 'Salaried',
      LoanProductId: 5,
      RequestedAmount: 500000.0,
      RequestedTenure: 60,
      InterestRate: 8.75,
      Status: 'In Processing',
      DecisionDate: null,
      DecisionReason: null,
      IsActive: true,
      CreatedAt: '2025-05-23T10:30:00',
      CreatedBy: 'admin@credwise.com',
      ModifiedAt: null,
      ModifiedBy: null,
    },
    {
      LoanApplicationId: 2,
      UserId: 2,
      Gender: 'Female',
      DOB: '1985-09-10',
      Aadhaar: '987654321098',
      Address: '45, Lake View Colony, Pune, Maharashtra, 411001',
      Income: 620000.0,
      EmploymentType: 'Self-Employed',
      LoanProductId: 3,
      RequestedAmount: 300000.0,
      RequestedTenure: 36,
      InterestRate: 9.25,
      Status: 'Initial Review',
      DecisionDate: null,
      DecisionReason: null,
      IsActive: true,
      CreatedAt: '2025-05-22T15:45:00',
      CreatedBy: 'user@credwise.com',
      ModifiedAt: null,
      ModifiedBy: null,
    },
    {
      LoanApplicationId: 3,
      UserId: 3,
      Gender: 'Male',
      DOB: '1992-12-20',
      Aadhaar: '456123789654',
      Address: '78, MG Road, Bengaluru, Karnataka, 560001',
      Income: 850000.0,
      EmploymentType: 'Salaried',
      LoanProductId: 4,
      RequestedAmount: 700000.0,
      RequestedTenure: 48,
      InterestRate: 7.95,
      Status: 'Documents Collected',
      DecisionDate: null,
      DecisionReason: null,
      IsActive: true,
      CreatedAt: '2025-05-21T12:20:00',
      CreatedBy: 'agent@credwise.com',
      ModifiedAt: null,
      ModifiedBy: null,
    },
    {
      LoanApplicationId: 4,
      UserId: 4,
      Gender: 'Female',
      DOB: '1995-03-05',
      Aadhaar: '369258147852',
      Address: '12, Park Street, Kolkata, West Bengal, 700016',
      Income: 540000.0,
      EmploymentType: 'Salaried',
      LoanProductId: 2,
      RequestedAmount: 250000.0,
      RequestedTenure: 24,
      InterestRate: 10.5,
      Status: 'Approved',
      DecisionDate: '2025-05-20T10:00:00',
      DecisionReason: 'Meets all eligibility criteria',
      IsActive: true,
      CreatedAt: '2025-05-18T09:00:00',
      CreatedBy: 'admin@credwise.com',
      ModifiedAt: '2025-05-20T10:10:00',
      ModifiedBy: 'reviewer@credwise.com',
    },
    {
      LoanApplicationId: 5,
      UserId: 5,
      Gender: 'Male',
      DOB: '1988-07-14',
      Aadhaar: '852741963159',
      Address: '9, Gandhi Nagar, Chennai, Tamil Nadu, 600020',
      Income: 450000.0,
      EmploymentType: 'Self-Employed',
      LoanProductId: 1,
      RequestedAmount: 200000.0,
      RequestedTenure: 12,
      InterestRate: 11.25,
      Status: 'Rejected',
      DecisionDate: '2025-05-19T11:00:00',
      DecisionReason: 'Insufficient income for requested amount',
      IsActive: false,
      CreatedAt: '2025-05-17T13:30:00',
      CreatedBy: 'agent@credwise.com',
      ModifiedAt: '2025-05-19T11:05:00',
      ModifiedBy: 'reviewer@credwise.com',
    },
    {
      LoanApplicationId: 6,
      UserId: 6,
      Gender: 'Female',
      DOB: '1993-11-22',
      Aadhaar: '741963852741',
      Address: 'Flat 6B, Ocean Heights, Vizag, Andhra Pradesh, 530002',
      Income: 990000.0,
      EmploymentType: 'Salaried',
      LoanProductId: 6,
      RequestedAmount: 900000.0,
      RequestedTenure: 60,
      InterestRate: 8.2,
      Status: 'Decision Pending',
      DecisionDate: null,
      DecisionReason: null,
      IsActive: true,
      CreatedAt: '2025-05-23T08:15:00',
      CreatedBy: 'admin@credwise.com',
      ModifiedAt: null,
      ModifiedBy: null,
    },
    {
      LoanApplicationId: 7,
      UserId: 7,
      Gender: 'male',
      DOB: '1993-11-22',
      Aadhaar: '741963852741',
      Address: 'Flat 6B, Ocean Heights, Vizag, Andhra Pradesh, 530002',
      Income: 990000.0,
      EmploymentType: 'Self-Employed',
      LoanProductId: 6,
      RequestedAmount: 9000000.0,
      RequestedTenure: 60,
      InterestRate: 9.6,
      Status: 'Decision Pending',
      DecisionDate: null,
      DecisionReason: true,
      IsActive: false,
      CreatedAt: '2025-05-23T08:15:00',
      CreatedBy: 'admin@credwise.com',
      ModifiedAt: null,
      ModifiedBy: null,
    },
  ];
  private url = 'http://localhost:3000/LoanApplications';

  constructor(private http: HttpClient) {}
  getEmiPlans() {
    return this.emiPlan;
  }
  getLoansData(): Observable<any> {
    return of(this.LoanApplication);
  }
  getAllLoans(): Observable<any> {
    return this.http.get('http://localhost:3000/LoanApplications');
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

  
}
