import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FDType } from '../../_models/fdtype.model';
import { FDTypeService } from '../../_services/fdtype.service';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-fixeddeposit',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzInputModule,
    RouterModule,
    NzTableModule,
    NzButtonModule,
    NzSwitchModule],
  templateUrl: './fixeddeposit.component.html',
  styleUrl: './fixeddeposit.component.scss'
})
export class FixeddepositComponent {
  fdTypes: FDType[] = [];
  editForm!: FormGroup;
  isEditModalVisible = false;
  currentFDTypeId: number | null = null;

  constructor(private fdTypeService: FDTypeService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchFDTypes();
  }

  fetchFDTypes() {
    this.fdTypeService.getAll().subscribe(data => this.fdTypes = data);
  }

  openEditModal(fd: FDType) {
    this.isEditModalVisible = false;
    this.currentFDTypeId = fd.fdtypeId;
    this.fdTypeService.getById(fd.fdtypeId).subscribe({
      next: (data) => {
        const {
          fdtypeId, name, description, interestRate, minAmount, maxAmount, duration, isActive
        } = data;
        this.editForm = this.fb.group({
          fdtypeId: [fdtypeId],
          name: [name, Validators.required],
          description: [description, Validators.required],
          interestRate: [interestRate, Validators.required],
          minAmount: [minAmount, Validators.required],
          maxAmount: [maxAmount, Validators.required],
          duration: [duration, Validators.required],
          isActive: [isActive]
        });
        setTimeout(() => {
          this.isEditModalVisible = true;
        }, 0);
      },
      error: (err) => {
        alert('Failed to fetch FD Type details. Please check the console for more info.');
      }
    });
  }

  handleEditOk() {
    if (this.editForm.valid && this.currentFDTypeId !== null) {
      const payload = this.editForm.value;
      this.fdTypeService.update(this.currentFDTypeId, payload).subscribe(() => {
        this.isEditModalVisible = false;
        this.fetchFDTypes();
      });
    } else {
      Object.values(this.editForm.controls).forEach(control => control.markAsTouched());
    }
  }

  handleEditCancel() {
    this.isEditModalVisible = false;
  }

}
