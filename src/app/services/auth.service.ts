import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class AuthService{
    private baseUrl = environment.apiUrl;
    constructor(private http: HttpClient){}
    
    login(data: {userName: string, password: string}){
        return this.http.post(this.baseUrl + 'api/auth/login', data)
    }
}