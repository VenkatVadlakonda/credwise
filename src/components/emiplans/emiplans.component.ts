import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { LoanService } from '../../_services/loan.service';
import {
  TableComponent,
  TableColumn,
} from '../../shared/components/table/table.component';

@Component({
  selector: 'app-emiplans',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
    NzModalModule,
    
  ],
  templateUrl: './emiplans.component.html',
  styleUrl: './emiplans.component.scss',
})
export class EmiplansComponent {
  // columns: TableColumn[] = [
  //   { header: 'EMI Plan ID', field: 'emiPlanId', width: '100px' },
  //   { header: 'Loan ID', field: 'loanId', width: '100px' },
  //   { header: 'Tenure (Months)', field: 'tenureInMonths', width: '150px' },
  //   { header: 'Interest Rate (%)', field: 'interestRate', width: '150px' },
  //   { header: 'Loan Amount', field: 'loanAmount', width: '150px' },
  //   { header: 'Monthly EMI', field: 'monthlyEmi', width: '150px' },
  //   { header: 'Start Date', field: 'startDate', width: '150px' },
  //   { header: 'Next Payment', field: 'nextPaymentDate', width: '150px' },
  //   { header: 'Status', field: 'status', width: '100px' },
  // ];

  // loanApplications: any[] = [];
  // emiPlans: any[] = [];
  // selectedLoan: any = null;
  // isModalVisible = false;
  // emiForm: any = {
  //   loanId: null,
  //   tenureInMonths: null,
  //   interestRate: null,
  //   loanAmount: null,
  //   startDate: null,
  // };

  // constructor(
  //   private loanService: LoanService,
  //   private modal: NzModalService
  // ) {}

  // ngOnInit() {
  //   this.loadLoanApplications();
  //   this.loadEmiPlans();
  // }

  // loadLoanApplications() {
  //   this.loanService.getLoansData().subscribe({
  //     next: (data) => {
  //       this.loanApplications = data.filter(
  //         (loan: any) => loan.Status === 'Approved' && loan.IsActive
  //       );
  //     },
  //     error: (error) => {
  //       console.error('Error loading loan applications:', error);
  //     },
  //   });
  // }

  // loadEmiPlans() {
  //   this.emiPlans = this.loanService.getEmiPlans();
  // }

  // calculateEMI(principal: number, rate: number, tenure: number): number {
  //   const monthlyRate = rate / 12 / 100;
  //   const emi =
  //     (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
  //     (Math.pow(1 + monthlyRate, tenure) - 1);
  //   return Math.round(emi);
  // }

  // showEmiModal(loan: any) {
  //   this.selectedLoan = loan;
  //   this.emiForm = {
  //     loanId: loan.LoanApplicationId,
  //     tenureInMonths: loan.RequestedTenure,
  //     interestRate: loan.InterestRate,
  //     loanAmount: loan.RequestedAmount,
  //     startDate: new Date(),
  //   };
  //   this.isModalVisible = true;
  // }

  // handleOk() {
  //   if (
  //     this.emiForm.loanId &&
  //     this.emiForm.tenureInMonths &&
  //     this.emiForm.interestRate &&
  //     this.emiForm.loanAmount &&
  //     this.emiForm.startDate
  //   ) {
  //     const monthlyEmi = this.calculateEMI(
  //       this.emiForm.loanAmount,
  //       this.emiForm.interestRate,
  //       this.emiForm.tenureInMonths
  //     );

  //     const emiData = {
  //       ...this.emiForm,
  //       monthlyEmi,
  //       startDate: this.emiForm.startDate.toISOString().split('T')[0],
  //     };

  //     this.loanService.createEmiPlan(emiData).subscribe({
  //       next: (response) => {
  //         this.modal.success({
  //           nzTitle: 'Success',
  //           nzContent: 'EMI plan has been created successfully!',
  //         });
  //         this.loadEmiPlans();
  //         this.isModalVisible = false;
  //         this.resetForm();
  //       },
  //       error: (error) => {
  //         this.modal.error({
  //           nzTitle: 'Error',
  //           nzContent: 'Failed to create EMI plan. Please try again.',
  //         });
  //         console.error('Error creating EMI plan:', error);
  //       },
  //     });
  //   }
  // }

  // handleCancel() {
  //   this.isModalVisible = false;
  //   this.resetForm();
  // }

  // private resetForm() {
  //   this.emiForm = {
  //     loanId: null,
  //     tenureInMonths: null,
  //     interestRate: null,
  //     loanAmount: null,
  //     startDate: null,
  //   };
  // }
}
