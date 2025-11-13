import { Component } from "@angular/core";
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
    templateUrl: './login.component.html',
})

export class LoginComponent{
   loginForm: FormGroup;

    constructor
    (
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ){
        this.loginForm = this.fb.group({
            userName: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(5)]],
        });
    }

    login(){

        if(this.loginForm.invalid){
            this.loginForm.markAllAsTouched();
        }

        const data = this.loginForm.value;

        this.authService.login(data).subscribe({
            next: (res : any) => {
                localStorage.setItem('token', res.token);
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                    alert('Giriş hatası: ' + err);
                }
        })
    }
}