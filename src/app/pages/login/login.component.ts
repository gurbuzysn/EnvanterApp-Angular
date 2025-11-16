import { Component } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }

    const data = this.loginForm.value;

    this.authService.login(data).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.Result.Token);
        
        this.authService.setUser(res.Result.User);

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        let errorMessage = 'Bilinmeyen bir hata oluştu.';

        if (err.error) {
          if (typeof err.error === 'string') {
            errorMessage = err.error; // Backend direkt string döndüyse
          } else if (err.error.message) {
            errorMessage = err.error.message; // Backend JSON message döndürdüyse
          } else if (err.error.errors) {
            // Validation Error (ASP.NET Core)
            errorMessage = Object.values(err.error.errors).flat().join('\n');
          }
        } else if (err.message) {
          errorMessage = err.message; // Angular Http hata mesajı
        }

        alert('Giriş Hatası:\n' + errorMessage);
      },
    });
  }
}
