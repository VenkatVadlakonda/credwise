import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoanService } from '../../_services/loan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  TableComponent,
  TableColumn,
} from '../../shared/components/table/table.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
// import { RepaymentPlanDTO } from '../../_models/repayment-plan.model';

@Component({
  selector: 'app-replaymentloan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent,
    
    NzIconModule,
    RouterLink,
  ],
  templateUrl: './replaymentloan.component.html',
  styleUrl: './replaymentloan.component.scss',
})
export class ReplaymentloanComponent implements OnInit {
  userId: number | null = null;
  loanId: number | null = null;
  loanDetails: any[] = [];
  emis: any[] = [];
  loading: boolean = false;
  isAdmin: boolean = true; // Hardcoded for now

  emiColumns: TableColumn[] = [
    { header: 'EMI #', field: 'InstallmentNumber', type: 'number' },
    { header: 'Due Date', field: 'DueDate', type: 'date' },
    { header: 'Principal', field: 'PrincipalAmount', type: 'number' },
    { header: 'Interest', field: 'InterestAmount', type: 'number' },
    { header: 'Total', field: 'TotalAmount', type: 'number' },
    { header: 'Remaining', field: 'RemainingBalance', type: 'number' },
    
  ];

  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.userId = params['userId'] ? +params['userId'] : null;
      this.loanId = params['loanId'] ? +params['loanId'] : null;

      if (this.userId) {
        this.loadUserLoans();
      } else if (this.loanId) {
        this.loadLoanDetails();
      }
    });
  }

  loadUserLoans() {
    if (this.userId) {
      this.loading = true;
      this.loanService.getLoansData().subscribe({
        next: (loans: any[]) => {
          this.loanDetails = loans.filter((l) => l.UserId === this.userId);
          this.loading = false;

          if (this.loanDetails.length === 1) {
            this.loanId = this.loanDetails[0].LoanApplicationId;
            this.loadEmis();
          }
        },
        error: (error) => {
          console.error('Error loading user loans:', error);
          this.loading = false;
        },
      });
    }
  }

  loadLoanDetails() {
    if (this.loanId) {
      this.loading = true;
      this.loanService.getLoansData().subscribe({
        next: (loans: any[]) => {
          const loan = loans.find((l) => l.LoanApplicationId === this.loanId);
          if (loan) {
            this.loanDetails = [loan];
            this.userId = loan.UserId;
            this.loadEmis();
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading loan details:', error);
          this.loading = false;
        },
      });
    }
  }

  loadEmis() {
    if (!this.loanDetails.length) return;
    // Dummy data for RepaymentPlanDTO with Status and Fine
    this.emis = [
      {
        InstallmentNumber: 1,
        DueDate: new Date(2024, 2, 15).toISOString(),
        PrincipalAmount: 5000,
        InterestAmount: 500,
        TotalAmount: 5500,
        RemainingBalance: 45000,
        Status: 'Paid',
        Fine: 0,
      },
      {
        InstallmentNumber: 2,
        DueDate: new Date(2024, 3, 15).toISOString(),
        PrincipalAmount: 5000,
        InterestAmount: 500,
        TotalAmount: 5500,
        RemainingBalance: 40000,
        Status: 'Overdue',
        Fine: 0,
      },
      {
        InstallmentNumber: 3,
        DueDate: new Date(2024, 4, 15).toISOString(),
        PrincipalAmount: 5000,
        InterestAmount: 500,
        TotalAmount: 5500,
        RemainingBalance: 35000,
        Status: 'Pending',
        Fine: 0,
      },
    ];
  }

  getStatus(emi: any): 'Paid' | 'Pending' | 'Overdue' {
    if (emi.Status === 'Paid') return 'Paid';
    const today = new Date();
    const dueDate = new Date(emi.DueDate);
    if (emi.Status === 'Overdue' || (today > dueDate && emi.Status !== 'Paid'))
      return 'Overdue';
    return 'Pending';
  }

  addFine(emi: any, fineAmount: number) {
    emi.Fine = (emi.Fine || 0) + fineAmount;
    emi.TotalAmount += fineAmount;
  }
}
