import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { Admin } from '../../_models/admin.model';
import { AdminService } from '../../_services/admin.service';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

 onSubmit(): void {
  if (this.signinForm.valid) {
    this.isLoading = true;
    this.errorMessage = '';

    const credentials = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    };

    this.authService.login(credentials).subscribe({
      next: (admin: Admin) => {
        console.log('Login response:', admin); // Debug log
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login error:', err); // Debug log
        this.errorMessage = err.error?.message || 'Login failed';
        this.isLoading = false;
      }
    });
  } else {
    this.errorMessage = 'Please fill in all required fields';
  }
}


  getErrorMessage(controlName: string): string {
    const control = this.signinForm.get(controlName);
    if (control?.hasError('required')) {
      return `${
        controlName === 'adminemail' ? 'Email' : controlName
      } is required`;
    }
    if (control?.hasError('minlength')) {
      return `${
        controlName === 'adminemail' ? 'Email' : controlName
      } must be at least ${
        control.errors?.['minlength'].requiredLength
      } characters`;
    }
    return '';
  }
}
