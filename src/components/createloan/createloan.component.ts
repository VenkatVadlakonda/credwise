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
  // In your component class
  columns: TableColumn[] = [
    { header: 'User ID', field: 'userId', type: 'text' },
    { header: 'Gender', field: 'gender', type: 'text' },

    { header: 'Loan Product ID', field: 'loanProductId', type: 'text' },
    { header: 'Requested Amount', field: 'requestedAmount', type: 'number' },
    { header: 'Requested Tenure', field: 'requestedTenure', type: 'number' },
    { header: 'Interest Rate', field: 'interestRate', type: 'number' },
    { header: 'Status', field: 'status', type: 'text' },
    {
      header: 'Actions',
      field: 'actions',
      type: 'button',
      buttonText: 'AddemI',
      buttonVariant: 'primary',
      buttonAction: (row: any) => this.openAddEMIModal(row),
    },
  ];

  // emiForm: FormGroup;

  private loanService = inject(LoanService);
  private nzMessage = inject(NzMessageService);
  private fb = inject(FormBuilder);

  // constructor() {
  //   this.emiForm = this.fb.group({
  //     tenureInMonths: ['', [Validators.required, Validators.min(1)]],
  //     interestRate: ['', [Validators.required, Validators.min(0)]],
  //     loanAmount: ['', [Validators.required, Validators.min(1)]],
  //     startDate: ['', Validators.required],
  //   });
  // }
  emiForm!: FormGroup;

  ngOnInit(): void {
    this.emiForm = this.fb.group({
      loanAmount: [null, [Validators.required, Validators.min(1)]],
      interestRate: [null, [Validators.required, Validators.min(0.01)]],
      tenureInMonths: [null, [Validators.required, Validators.min(1)]],
      startDate: [null, [Validators.required]],
    });
    this.fetchLoans();
  }

  // fetchLoans() {
  //   this.loading = true;
  //   this.loanService.getAllLoans().subscribe({
  //     next: (data: any) => {
  //       this.loans = data;
  //       this.loading = false;
  //     },
  //     error: () => {
  //       this.loading = false;
  //     },
  //   });
  // }
  fetchLoans() {
    this.loading = true;
    const emiPlans = JSON.parse(localStorage.getItem('emiPlans') || '[]');

    this.loanService.getAllLoans().subscribe({
      next: (data: any[]) => {
        this.loans = data.map((loan) => ({
          ...loan,
          hasEMIPlan: emiPlans.some(
            (plan: any) => plan.loanApplicationId === loan.id
          ),
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  // openAddEMIModal(row: any) {
  //   this.selectedLoanId = row.id;
  //   this.emiForm.patchValue({
  //     tenureInMonths: row.requestedTenure || '',
  //     interestRate: row.interestRate || '',
  //     loanAmount: row.requestedAmount || '',
  //     startDate: new Date().toISOString().split('T')[0],
  //   });
  //   this.showEMIModal = true;
  // }
  openAddEMIModal(loan: any) {
    this.emiForm = this.fb.group({
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
    this.selectedLoanId = loan.id || loan.loanApplicationId;
    this.showEMIModal = true;
  }

  closeEMIModal() {
    this.showEMIModal = false;
    this.selectedLoanId = null;
    this.emiForm.reset();
  }

  // submitEMIPlan() {
  //   if (this.emiForm.valid && this.selectedLoanId) {
  //     const emiData = {
  //       loanId: this.selectedLoanId,
  //       tenureInMonths: this.emiForm.value.tenureInMonths,
  //       interestRate: this.emiForm.value.interestRate,
  //       loanAmount: this.emiForm.value.loanAmount,
  //       startDate: this.emiForm.value.startDate,
  //     };

  //     this.loading = true;
  //     this.loanService.generateEMIPlan(this.selectedLoanId, emiData).subscribe({
  //       next: () => {
  //         this.closeEMIModal();
  //         this.fetchLoans(); // Refresh the loan list
  //         // You might want to add a success notification here
  //       },
  //       error: (err) => {
  //         console.error('Error generating EMI plan:', err);
  //         this.loading = false;
  //         // You might want to add an error notification here
  //       },
  //     });
  //   }
  // }
  submitEMIPlan(): void {
    if (this.emiForm.valid && this.selectedLoanId) {
      const existingPlans = JSON.parse(
        localStorage.getItem('emiPlans') || '[]'
      );
      const alreadyExists = existingPlans.some(
        (plan: any) => plan.loanApplicationId === this.selectedLoanId
      );
      if (alreadyExists) {
        this.nzMessage.warning('EMI plan already exists for this loan!');
        return;
      }
      const emiPlan = {
        id: new Date().getTime(),
        loanApplicationId: this.selectedLoanId,
        ...this.emiForm.value,
      };
      existingPlans.push(emiPlan);
      localStorage.setItem('emiPlans', JSON.stringify(existingPlans));
      this.showEMIModal = false;
      this.fetchLoans();
      this.emiForm.reset();
      this.nzMessage.success('EMI plan saved locally!');
    } else {
      this.emiForm.markAllAsTouched();
    }
  }
}
