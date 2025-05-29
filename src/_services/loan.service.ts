import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RepaymentPlanDTO } from '../_models/repayment-plan.model';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  emiPlans = [
    {
      emiPlanId: 1,
      loanId: 1,
      tenureInMonths: 36,
      interestRate: 9.5,
      loanAmount: 500000,
      startDate: '2024-03-15',
      monthlyEmi: 16000,
      status: 'Active',
      totalAmount: 576000,
      remainingAmount: 576000,
      nextPaymentDate: '2024-04-15',
      paymentHistory: [],
    },
    {
      emiPlanId: 2,
      loanId: 2,
      tenureInMonths: 24,
      interestRate: 10.5,
      loanAmount: 300000,
      startDate: '2024-03-10',
      monthlyEmi: 13900,
      status: 'Active',
      totalAmount: 333600,
      remainingAmount: 333600,
      nextPaymentDate: '2024-04-10',
      paymentHistory: [],
    },
    {
      emiPlanId: 3,
      loanId: 3,
      tenureInMonths: 48,
      interestRate: 8.75,
      loanAmount: 700000,
      startDate: '2024-03-20',
      monthlyEmi: 17300,
      status: 'Active',
      totalAmount: 830400,
      remainingAmount: 830400,
      nextPaymentDate: '2024-04-20',
      paymentHistory: [],
    },
    {
      emiPlanId: 4,
      loanId: 4,
      tenureInMonths: 60,
      interestRate: 9.25,
      loanAmount: 1000000,
      startDate: '2024-03-25',
      monthlyEmi: 20900,
      status: 'Active',
      totalAmount: 1254000,
      remainingAmount: 1254000,
      nextPaymentDate: '2024-04-25',
      paymentHistory: [],
    },
    {
      emiPlanId: 5,
      loanId: 5,
      tenureInMonths: 12,
      interestRate: 11.25,
      loanAmount: 200000,
      startDate: '2024-03-05',
      monthlyEmi: 17700,
      status: 'Active',
      totalAmount: 212400,
      remainingAmount: 212400,
      nextPaymentDate: '2024-04-05',
      paymentHistory: [],
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
    return this.emiPlans;
  }
  getLoansData(): Observable<any> {
    return of(this.LoanApplication);
  }
  getAllLoans(): Observable<any> {
    return this.http.get('http://localhost:3000/LoanApplications');
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

  createEmiPlan(emiData: any): Observable<any> {
    const newEmiPlan = {
      emiPlanId: this.emiPlans.length + 1,
      ...emiData,
      status: 'Active',
      totalAmount: emiData.monthlyEmi * emiData.tenureInMonths,
      remainingAmount: emiData.monthlyEmi * emiData.tenureInMonths,
      nextPaymentDate: new Date(emiData.startDate).toISOString().split('T')[0],
      paymentHistory: [],
    };

    this.emiPlans.push(newEmiPlan);
    return of(newEmiPlan);
  }

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
}
