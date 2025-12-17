import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule],
  templateUrl: './login.component.html',
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
    }

    const data = this.loginForm.value;

    this.authService.login(data).subscribe({
      next: (res: any) => {
        this.authService.setUser(res.Result);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        let errorMessage = 'Bilinmeyen bir hata oluştu.';
        if (error.error) {
          if (typeof error.error === 'string') { errorMessage = error.error;}
          else if (error.error.message) { errorMessage = error.error.message;}
          else if (error.error.Message) { errorMessage = error.error.Message; }
          else if (error.error.errors) { errorMessage = Object.values(error.error.errors).flat().join('\n'); }
        } 
        else if (error.message) {
          errorMessage = error.message;
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Giriş Hatası',
          detail: errorMessage,
        });
      },
    });
  }
}
