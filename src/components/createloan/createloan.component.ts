import { Component, inject, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoanService } from '../../_services/loan.service';
import {
  TableColumn,
  TableComponent,
} from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RepaymentService } from '../../_services/repayment.service';

@Component({
  selector: 'app-createloan',
  imports: [TableComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './createloan.component.html',
  styleUrl: './createloan.component.scss',
})
export class CreateloanComponent implements OnInit {
  loans: any[] = [];
  showEMIModal: boolean = false;
  loading = false;
  selectedLoanId: number | null = null;

  columns: TableColumn[] = [
    { header: 'Loan ID', field: 'loanApplicationId', type: 'text' },
    { header: 'User ID', field: 'userId', type: 'text' },
    { header: 'User ID', field: 'userId', type: 'text' },
    { header: 'Gender', field: 'gender', type: 'text' },
    { header: 'EmploymentType', field: 'employmentType', type: 'text' },
    { header: 'Loan Product ID', field: 'loanProductId', type: 'text' },
    { header: 'Requested Amount', field: 'requestedAmount', type: 'number' },
    { header: 'Requested Tenure', field: 'requestedTenure', type: 'number' },

    {
      header: 'Actions',
      field: 'actions',
      type: 'button',
      buttonText: 'Add EMI',
      buttonVariant: 'primary',
      buttonAction: (row: any) => this.openAddEMIModal(row),
    },
  ];

  private loanService = inject(LoanService);
  private repayment = inject(RepaymentService);
  private nzMessage = inject(NzMessageService);
  private fb = inject(FormBuilder);

  emiForm!: FormGroup;

  ngOnInit(): void {
    this.emiForm = this.fb.group({
      loanId: [null, [Validators.required, Validators.min(1)]],
      loanAmount: [null, [Validators.required, Validators.min(1)]],
      interestRate: [null, [Validators.required, Validators.min(0.01)]],
      tenureInMonths: [null, [Validators.required, Validators.min(1)]],
      startDate: [null, [Validators.required]],
    });
    this.fetchLoans();
  }

  fetchLoans() {
    this.loading = true;
    this.loanService.getAllLoans().subscribe({
      next: (data: any[]) => {
        this.loans = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  openAddEMIModal(loan: any) {
    this.selectedLoanId = loan.loanApplicationId; // Set before initializing the form
    this.emiForm = this.fb.group({
      loanId: [this.selectedLoanId, [Validators.required, Validators.min(1)]],
      loanAmount: [
        loan.requestedAmount,
        [Validators.required, Validators.min(1)],
      ],
      interestRate: [
        loan.interestRate,
        [Validators.required, Validators.min(0.01)],
      ],
      tenureInMonths: [
        loan.requestedTenure,
        [Validators.required, Validators.min(1)],
      ],
      startDate: [
        new Date().toISOString().split('T')[0],
        [Validators.required],
      ],
    });
    this.showEMIModal = true;
  }

  closeEMIModal() {
    this.showEMIModal = false;
    this.selectedLoanId = null;
    this.emiForm.reset();
  }

  submitEMIPlan() {
    if (this.emiForm.valid) {
      const emiData = {
        loanId: this.emiForm.value.loanApplicationId,
        tenureInMonths: this.emiForm.value.tenureInMonths,
        interestRate: this.emiForm.value.interestRate,
        loanAmount: this.emiForm.value.loanAmount,
        startDate: this.emiForm.value.startDate,
      };

      this.loading = true;
      this.repayment.postEmi(emiData).subscribe({
        next: (response) => {
          console.log('EmiData:', response);
          this.nzMessage.success('EMI plan generated and saved!');
          this.closeEMIModal();
          this.fetchLoans();
        },
        error: (err) => {
          console.error('Error generating EMI plan:', err.message);
          this.loading = false;
        },
      });
    }
  }
}
