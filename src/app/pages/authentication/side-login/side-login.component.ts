import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AppAuthBrandingComponent } from '../../../layouts/full/vertical/sidebar/auth-branding.component';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-side-login',
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppAuthBrandingComponent,
    CommonModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  options = this.settings.getOptions();
  isLoading = false;

  constructor(
    private settings: CoreService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  form = new FormGroup({
    userName: new FormControl('admin@envanterapp.com', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('123456', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    const username = this.form.get('userName')?.value || '';
    const password = this.form.get('password')?.value || '';

    this.authService.login(username, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login response.isSuccess:', response.isSuccess);
        if (response.isSuccess) {
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          // Store token if available
          if (response.result?.token) {
            localStorage.setItem('authToken', response.result.token);
          }
          // Navigate to dashboard
          this.router.navigate(['/dashboards/dashboard1']);
        } else {
          this.snackBar.open(response.message || 'Login failed', 'Close', {
            duration: 3000,
          });
        }
      },
      error: (error) => {
        this.isLoading = false;
        const errorMessage =
          error?.error?.message ||
          error?.message ||
          'An error occurred during login';
        this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
        console.error('Login error:', error);
      },
    });
  }
}
