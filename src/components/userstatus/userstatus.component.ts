import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../_services/loan.service';
import {
  TableComponent,
  TableColumn,
} from '../../shared/components/table/table.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-userstatus',
  standalone: true,
  imports: [CommonModule, TableComponent, ButtonComponent],
  templateUrl: './userstatus.component.html',
  styleUrl: './userstatus.component.scss',
})
export class UserstatusComponent implements OnInit {
  loans: any[] = [];
  loading = false;
  columns: TableColumn[] = [
    { header: 'Loan ID', field: 'LoanApplicationId', type: 'number' },
    { header: 'Amount', field: 'RequestedAmount', type: 'number' },
    { header: 'Status', field: 'Status', type: 'text' },
  ];

  constructor(private loanService: LoanService) {}

  ngOnInit() {
    this.loading = true;
    this.loanService.getLoansData().subscribe((loans) => {
      this.loans = loans;
      this.loading = false;
    });
  }

  approveLoan(loan: any) {
    loan.Status = 'Approved';
  }

  rejectLoan(loan: any) {
    loan.Status = 'Rejected';
  }
}
