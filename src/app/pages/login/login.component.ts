import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule],
    templateUrl: './login.component.html',
})
export class LoginComponent{
    userName : string = "";
    password : string = "";

    constructor(private authService: AuthService, private router: Router){}

    login(){
        const data ={
            userName: this.userName,
            password: this.password
        }

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