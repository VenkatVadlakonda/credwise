import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { LoanProduct } from '../../_models/loans.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoanProductService } from '../../_services/loan-product.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-loantypes',
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzInputModule,
    RouterModule,
    NzSwitchModule,
    FormsModule,
    NzTableModule,
  ],
  templateUrl: './loantypes.component.html',
  styleUrl: './loantypes.component.scss',
})
export class LoantypesComponent {
  loanTypes: LoanProduct[] = [];
  editForm!: FormGroup;
  isEditModalVisible = false;
  currentLoanId: number | null = null;

  @ViewChild('editModalTemplate', { static: true })
  editModalTemplate!: TemplateRef<any>;

  constructor(
    private loanProductService: LoanProductService,
    private modal: NzModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchLoanTypes();
  }

  fetchLoanTypes() {
    this.loanProductService.getAll().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.loanTypes = data;
      } else if (data && Array.isArray(data.data)) {
        this.loanTypes = data.data;
      } else {
        this.loanTypes = [];
      }
    });
  }

  openEditModal(loan: LoanProduct): void {
    this.currentLoanId = loan.id;
    this.loanProductService.getPersonalLoanById(loan.id).subscribe({
      next: (data: any) => {
        const detail = data.loanDetail || {};
        const group: any = {
          loanProductId: [data.id],
          imageUrl: [
            data.imageUrl || data.image || '',
            [
              Validators.required,
              Validators.pattern(
                /^(https?:\/\/)?([\w\-])+\.([\w\-]+)+(\/[\w\-.,@?^=%&:/~+#]*)?$/
              ),
            ],
          ],
          title: [
            data.title,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100),
            ],
          ],
          description: [
            data.description,
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(500),
            ],
          ],
          maxLoanAmount: [
            data.maxLoanAmount,
            [
              Validators.required,
              Validators.min(1000),
              Validators.max(100000000),
            ],
          ],
          loanType: [data.loanType, Validators.required],
          isActive: [data.isActive !== undefined ? data.isActive : true],
          interestRate: [
            detail.interestRate,
            [Validators.required, Validators.min(0.1), Validators.max(100)],
          ],
          tenureMonths: [
            detail.tenureMonths,
            [Validators.required, Validators.min(1), Validators.max(600)],
          ],
          processingFee: [
            detail.processingFee,
            [Validators.required, Validators.min(0), Validators.max(10000000)],
          ],
        };

        if (data.loanType === 'PERSONAL') {
          group.minSalaryRequired = [
            detail.minSalaryRequired,
            [Validators.required, Validators.min(1000)],
          ];
        }
        if (data.loanType === 'HOME') {
          group.downPaymentPercentage = [
            detail.downPaymentPercentage,
            [Validators.required, Validators.min(0), Validators.max(100)],
          ];
        }
        if (data.loanType === 'GOLD') {
          group.goldPurityRequired = [
            detail.goldPurityRequired || '',
            [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
          ];
          group.repaymentType = [
            detail.repaymentType || '',
            [Validators.required, Validators.minLength(3)],
          ];
        }

        this.editForm = this.fb.group(group);
        this.isEditModalVisible = true;
      },
    });
  }

  handleEditOk(): void {
    if (!this.editForm.dirty) {
      this.modal.error({
        nzTitle: 'No Changes Detected',
        nzContent:
          'No changes detected. Please modify at least one field before submitting or click the cancel.',
      });
      return;
    }
    if (this.editForm.valid && this.currentLoanId !== null) {
      const formValue = this.editForm.value;
      let payload: any;
      let update$: Observable<any> | undefined;

      if (formValue.loanType === 'PERSONAL') {
        payload = {
          loanProductId: formValue.loanProductId,
          imageUrl: formValue.imageUrl,
          title: formValue.title,
          description: formValue.description,
          maxLoanAmount: formValue.maxLoanAmount,
          loanType: 'PERSONAL',
          interestRate: formValue.interestRate,
          tenureMonths: formValue.tenureMonths,
          processingFee: formValue.processingFee,
          minSalaryRequired: formValue.minSalaryRequired,
          isActive: formValue.isActive,
        };
        update$ = this.loanProductService.updatePersonalLoan(
          this.currentLoanId,
          payload
        );
      } else if (formValue.loanType === 'HOME') {
        payload = {
          loanProductId: formValue.loanProductId,
          imageUrl: formValue.imageUrl,
          title: formValue.title,
          description: formValue.description,
          maxLoanAmount: formValue.maxLoanAmount,
          loanType: 'HOME',
          interestRate: formValue.interestRate,
          tenureMonths: formValue.tenureMonths,
          processingFee: formValue.processingFee,
          downPaymentPercentage: formValue.downPaymentPercentage,
          isActive: formValue.isActive,
        };
        update$ = this.loanProductService.updateHomeLoan(
          this.currentLoanId,
          payload
        );
      } else if (formValue.loanType === 'GOLD') {
        payload = {
          loanProductId: formValue.loanProductId,
          imageUrl: formValue.imageUrl,
          title: formValue.title,
          description: formValue.description,
          maxLoanAmount: formValue.maxLoanAmount,
          loanType: 'GOLD',
          interestRate: formValue.interestRate,
          tenureMonths: formValue.tenureMonths,
          processingFee: formValue.processingFee,
          goldPurityRequired: formValue.goldPurityRequired,
          repaymentType: formValue.repaymentType,
          isActive: formValue.isActive,
        };
        update$ = this.loanProductService.updateGoldLoan(
          this.currentLoanId,
          payload
        );
      }

      if (update$) {
        console.log('Payload:', payload);
        update$.subscribe({
          next: () => {
            this.isEditModalVisible = false;
            this.fetchLoanTypes();
          },
          error: (err) => {
            console.error('Update error:', err);
          },
        });
      }
    } else {
      Object.values(this.editForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      console.log('Form invalid:', this.editForm.errors, this.editForm.value);
    }
  }

  handleEditCancel(): void {
    this.isEditModalVisible = false;
  }

  toggleActiveStatus(loan: any): void {
    const action = loan.isActive ? 'deactivate' : 'activate';
    this.modal.confirm({
      nzTitle: `Are you sure you want to ${action} this loan type?`,
      nzContent: `This will ${action} the loan type: <b>${loan.title}</b>.`,
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOnOk: () => {
        this.loanProductService.toggleStatus(loan.id).subscribe({
          next: () => this.fetchLoanTypes(),
          error: (err) => {
            this.modal.error({
              nzTitle: 'Error',
              nzContent: 'Failed to update loan status. Please try again.',
            });
            console.error('Toggle active status error:', err);
          },
        });
      },
    });
  }
}
