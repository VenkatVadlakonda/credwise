import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../_services/loan.service';
import { UserService } from '../../_services/user.service';
import {
  TableComponent,
  TableColumn,
} from '../../shared/components/table/table.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { forkJoin } from 'rxjs';

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
    { header: 'Loan ID', field: 'loanApplicationId', type: 'number' },
    { header: 'First Name', field: 'firstName', type: 'text' },
    { header: 'Phone Number', field: 'phoneNumber', type: 'text' },
    { header: 'Amount', field: 'requestedAmount', type: 'number' },
    { header: 'Status', field: 'status', type: 'text' },
    { header: 'Actions', field: 'actions', type: 'custom' },
  ];

  constructor(
    private loanService: LoanService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loading = true;
    forkJoin({
      loans: this.loanService.getAllLoans(),
      users: this.userService.getAllUsers(),
    }).subscribe(({ loans, users }) => {
      this.loans = loans.map((loan: any) => {
        const user = users.find((u: any) => u.userId === loan.userId);
        return {
          ...loan,
          firstName: user ? user.firstName : '',
          phoneNumber: user ? user.phoneNumber : '',
        };
      });
      this.loading = false;
    });
  }

  approveLoan(loan: any) {
    this.loanService
      .updateLoanStatus(loan.loanApplicationId, 'Approved')
      .subscribe(() => {
        loan.status = 'Approved';
      });
  }

  rejectLoan(loan: any) {
    this.loanService
      .updateLoanStatus(loan.loanApplicationId, 'Rejected')
      .subscribe(() => {
        loan.status = 'Rejected';
      });
  }
}
