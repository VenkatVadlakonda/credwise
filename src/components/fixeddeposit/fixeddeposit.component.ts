import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FDType } from '../../_models/fdtype.model';
import { FDTypeService } from '../../_services/fdtype.service';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-fixeddeposit',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzInputModule,
    RouterModule,
    NzTableModule,
    NzButtonModule,
    NzSwitchModule,
    NzFormModule,
  ],
  templateUrl: './fixeddeposit.component.html',
  styleUrl: './fixeddeposit.component.scss',
})
export class FixeddepositComponent {
  fdTypes: FDType[] = [];
  editForm!: FormGroup;
  isEditModalVisible = false;
  currentFDTypeId: number | null = null;

  constructor(
    private fdTypeService: FDTypeService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService
  ) {
    
  }

  ngOnInit() {
    this.fetchFDTypes();
  }

  fetchFDTypes() {
    this.fdTypeService.getAll().subscribe(data => this.fdTypes = data);
  }

  openEditModal(fd: any): void {
    console.log('Opening edit modal for FD:', fd);
    this.currentFDTypeId = fd.fdtypeId;
    this.editForm = this.fb.group({
      fdtypeId: [fd.fdtypeId],
      name: [fd.name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [fd.description, [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
      interestRate: [fd.interestRate, [Validators.required, Validators.min(0), Validators.max(100)]],
      minAmount: [fd.minAmount, [Validators.required, Validators.min(1), Validators.max(100000000)]],
      maxAmount: [fd.maxAmount, [Validators.required, Validators.min(1), Validators.max(100000000)]],
      duration: [fd.duration, [Validators.required, Validators.min(1), Validators.max(1200)]],
      isActive: [fd.isActive !== undefined && fd.isActive !== null ? fd.isActive : true]
    });
    this.isEditModalVisible = true;
  }

  handleEditOk() {
    if (this.editForm.valid && this.currentFDTypeId !== null) {
      const formValue = this.editForm.value;
      const payload = {
        fdtypeId: formValue.fdtypeId,
        name: formValue.name,
        description: formValue.description,
        interestRate: formValue.interestRate,
        minAmount: formValue.minAmount,
        maxAmount: formValue.maxAmount,
        duration: formValue.duration,
        isActive: formValue.isActive
      };
      console.log('Submitting FD update payload:', payload);
      this.fdTypeService.update(payload.fdtypeId, payload).subscribe({
        next: (response) => {
          console.log('FD update response:', response);
          this.isEditModalVisible = false;
          this.fetchFDTypes();
        },
        error: (error) => {
          console.error('FD update error:', error);
        }
      });
    } else {
      Object.values(this.editForm.controls).forEach(control => control.markAsTouched());
      console.warn('FD edit form invalid:', this.editForm.errors, this.editForm.value);
    }
  }

  handleEditCancel() {
    this.isEditModalVisible = false;
  }

  toggleActiveStatus(fd: any): void {
    const action = fd.isActive ? 'deactivate' : 'activate';
    this.modal.confirm({
      nzTitle: `Are you sure you want to ${action} this FD type?`,
      nzContent: `This will ${action} the FD type: <b>${fd.name}</b>.`,
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOnOk: () => {
        this.fdTypeService.toggleStatus(fd.fdtypeId).subscribe({
          next: () => {
            this.fetchFDTypes();
          },
          error: (err) => {
            this.modal.error({
              nzTitle: 'Error',
              nzContent: 'Failed to update FD type status. Please try again.'
            });
            console.error('Toggle active status error:', err);
          }
        });
      }
    });
  }
}
