import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent{
    userName : string = "";
    password : string = "";

    constructor(private authService: AuthService){}

    login(){
        const data ={
            userName: this.userName,
            password: this.password
        }

        this.authService.login(data).subscribe({
            next: (res) => {
                alert('Giriş başarılı: ' + res);
            },
            error: (err) => {
                alert('Giriş hatası: ' + err);
            }
        })
    }
}