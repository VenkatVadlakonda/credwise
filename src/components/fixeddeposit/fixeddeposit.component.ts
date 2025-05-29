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
import { NzModalModule } from 'ng-zorro-antd/modal';
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
  isEditLoading: boolean = false;

  constructor(
    private fdTypeService: FDTypeService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchFDTypes();
  }

  fetchFDTypes() {
    this.fdTypeService.getAll().subscribe((data) => (this.fdTypes = data));
  }

  // showEditModal(fd: FDType) {
  //   this.currentFDTypeId = fd.fdtypeId;
  //   this.editForm = this.fb.group({
  //     name: [fd.name, [Validators.required]],
  //     description: [fd.description, [Validators.required]],
  //     interestRate: [fd.interestRate, [Validators.required, Validators.min(0)]],
  //     minAmount: [fd.minAmount, [Validators.required, Validators.min(0)]],
  //     maxAmount: [fd.maxAmount, [Validators.required, Validators.min(0)]],
  //     duration: [fd.duration, [Validators.required, Validators.min(1)]],
  //     isActive: [fd.isActive],
  //   });
  //   this.isEditModalVisible = true;
  //   this.cdr.detectChanges();
  // }

  showEditModal(fd: FDType) {
    this.currentFDTypeId = fd.fdtypeId;
    this.editForm = this.fb.group({
      name: [fd.name, [Validators.required]],
      description: [fd.description, [Validators.required]],
      interestRate: [fd.interestRate, [Validators.required, Validators.min(0)]],
      minAmount: [fd.minAmount, [Validators.required, Validators.min(0)]],
      maxAmount: [fd.maxAmount, [Validators.required, Validators.min(0)]],
      duration: [fd.duration, [Validators.required, Validators.min(1)]],
      isActive: [fd.isActive],
      createdBy: [fd.createdBy],
      modifiedBy: [fd.modifiedBy],
      createdAt: [fd.createdAt],
      modifiedAt: [fd.modifiedAt],
    });
    this.isEditModalVisible = true;
    this.cdr.detectChanges();
  }

  handleEditOk() {
    if (this.editForm.valid && this.currentFDTypeId !== null) {
      this.isEditLoading = true; // Start loading
      const updatedFD: FDType = {
        fdtypeId: this.currentFDTypeId,
        ...this.editForm.value,
      };
      this.fdTypeService.update(this.currentFDTypeId, updatedFD).subscribe({
        next: () => {
          this.fetchFDTypes();
          this.isEditModalVisible = false;
          this.isEditLoading = false; // Stop loading
        },
        error: () => {
          // Handle error if needed
          this.isEditLoading = false;
        },
      });
    }
  }

  handleEditCancel() {
    this.isEditModalVisible = false;
  }
}
