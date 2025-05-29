import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoanService } from '../../_services/loan.service';
import { TableColumn, TableComponent } from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-createloan',
  imports: [TableComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './createloan.component.html',
  styleUrl: './createloan.component.scss',
})
export class CreateloanComponent implements OnInit {
  loans: any[] = [];
  showEMIModal = false;
  loading = false;
  selectedLoanId: number | null = null;
  // In your component class
columns: TableColumn[] = [
  { header: 'User ID', field: 'userId', type: 'text' },
  { header: 'Gender', field: 'gender', type: 'text' },
  { header: 'Income', field: 'income', type: 'number' },
  { header: 'Employment Type', field: 'employmentType', type: 'text' },
  { header: 'Loan Product ID', field: 'loanProductId', type: 'text' },
  { header: 'Requested Amount', field: 'requestedAmount', type: 'number' },
  { header: 'Requested Tenure', field: 'requestedTenure', type: 'number' },
  { header: 'Interest Rate', field: 'interestRate', type: 'number' },
  { 
    header: 'Actions', 
    field: 'actions',
    type: 'button',
    buttonText: 'AddeMI',
    buttonVariant: 'primary',
    buttonAction: (row: any) => this.openAddEMIModal(row)
  }
];


  emiForm: FormGroup;
  
  private loanService = inject(LoanService);
  private fb = inject(FormBuilder);

  constructor() {
    this.emiForm = this.fb.group({
      tenureInMonths: ['', [Validators.required, Validators.min(1)]],
      interestRate: ['', [Validators.required, Validators.min(0)]],
      loanAmount: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchLoans();
  }

  fetchLoans() {
    this.loading = true;
    this.loanService.getAllLoans().subscribe({
      next: (data: any) => {
        this.loans = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  // openAddEMIModal(loan: any) {
  //   this.selectedLoanId = loan.id;
  //   // Pre-fill form with loan data
  //   this.emiForm.patchValue({
  //     tenureInMonths: loan.requestedTenure || '',
  //     interestRate: loan.interestRate || '',
  //     loanAmount: loan.requestedAmount || '',
  //     startDate: new Date().toISOString().split('T')[0] // Default to today
  //   });
  //   this.showEMIModal = true;
  // }
openAddEMIModal(row: any) {
  this.selectedLoanId = row.id;
  this.emiForm.patchValue({
    tenureInMonths: row.requestedTenure || '',
    interestRate: row.interestRate || '',
    loanAmount: row.requestedAmount || '',
    startDate: new Date().toISOString().split('T')[0]
  });
  this.showEMIModal = true;
}

  closeEMIModal() {
    this.showEMIModal = false;
    this.selectedLoanId = null;
    this.emiForm.reset();
  }

  submitEMIPlan() {
    if (this.emiForm.valid && this.selectedLoanId) {
      const emiData = {
        loanId: this.selectedLoanId,
        tenureInMonths: this.emiForm.value.tenureInMonths,
        interestRate: this.emiForm.value.interestRate,
        loanAmount: this.emiForm.value.loanAmount,
        startDate: this.emiForm.value.startDate
      };

      this.loading = true;
      this.loanService.generateEMIPlan(this.selectedLoanId, emiData).subscribe({
        next: () => {
          this.closeEMIModal();
          this.fetchLoans(); // Refresh the loan list
          // You might want to add a success notification here
        },
        error: (err) => {
          console.error('Error generating EMI plan:', err);
          this.loading = false;
          // You might want to add an error notification here
        }
      });
    }
  }
}
