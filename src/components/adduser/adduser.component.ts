import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import {
  TableComponent,
  TableColumn,
} from '../../shared/components/table/table.component';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzEmptyModule,
    TableComponent,
  ],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss',
})
export class AdduserComponent implements OnInit {
  columns: TableColumn[] = [
    { header: 'First Name', field: 'firstName', width: '150px' },
    { header: 'Last Name', field: 'lastName', width: '150px' },
    { header: 'Email', field: 'email', width: '150px' },
    { header: 'Phone Number', field: 'phoneNumber', width: '150px' },
  ];

  data: any[] = [];
  isModalVisible = false;
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private modal: NzModalService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[6-9]\\d{9}$')],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]+$'
          ),
        ],
      ],
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUserApi().subscribe({
      next: (users) => {
        console.log(users);
        this.data = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      },
    });
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.userForm.reset();
  }

  handleOk(): void {
    if (this.userForm.valid) {
      this.userService.postUserApi(this.userForm.value).subscribe({
        next: () => {
          this.modal.success({
            nzTitle: 'Success',
            nzContent: 'User registered successfully!',
          });
          this.isModalVisible = false;
          this.userForm.reset();
          this.loadUsers();
        },
        error: (error) => {
          this.modal.error({
            nzTitle: 'Error',
            nzContent: 'Failed to register user. Please try again.',
          });
          console.error('Error registering user:', error.Message);
        },
      });
    } else {
      this.validateForm();
    }
  }

  validateForm(): void {
    Object.keys(this.userForm.controls).forEach((key) => {
      const control = this.userForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    }
    if (control?.hasError('pattern')) {
      switch (controlName) {
        case 'firstName':
        case 'lastName':
          return 'Only alphabets are allowed';
        case 'email':
          return 'Please enter a valid email address';
        case 'phoneNumber':
          return 'Phone number must start with 6-9 and have 10 digits';
        case 'password':
          return 'Password must contain letters, numbers, and special characters';
        default:
          return 'Invalid format';
      }
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  }
}
