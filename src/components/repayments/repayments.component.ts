import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../_services/loan.service';
import {
  TableColumn,
  TableComponent,
} from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { RepaymentPlanDTO } from '../../_models/repayment-plan.model';
import { FormsModule } from '@angular/forms';
import { RepaymentPipe } from '../../_pipes/repayment.pipe';

@Component({
  selector: 'app-repayments',
  standalone: true,
  imports: [CommonModule, TableComponent, FormsModule, RepaymentPipe],
  templateUrl: './repayments.component.html',
  styleUrl: './repayments.component.scss',
})
export class RepaymentsComponent implements OnInit {
  loans: any[] = [];
  selectedLoan: any = null;
  emis: any[] = [];
  loading: boolean = false;
  loanId: string = '';

  loanColumns: TableColumn[] = [
    { header: 'Loan ID', field: 'loanApplicationId', type: 'number' },
    { header: 'User ID', field: 'userId', type: 'number' },
    { header: 'Loan Type', field: 'loanType', type: 'text' },
    { header: 'EmploymentType', field: 'employmentType', type: 'text' },
    { header: 'Amount', field: 'requestedAmount', type: 'number' },
  ];

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.loanService.getAllLoans().subscribe({
      next: (data) => {
        this.loans = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading loans:', error);
        this.loading = false;
      },
    });
  }

  onLoanSelect(loan: any) {
    this.router.navigate(['/repaymentemi', loan.loanApplicationId || loan.id]);
  }

  onLoanIdChange(value: string) {
    this.loanId = value;
  }
}
