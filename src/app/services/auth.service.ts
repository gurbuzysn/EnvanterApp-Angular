import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class AuthService{
    private baseUrl = environment.apiUrl;
    currentUser = new BehaviorSubject<any | null>(null);

    constructor(private http: HttpClient){
        const savedUser = localStorage.getItem('user');
        if(savedUser){
            this.currentUser.next(JSON.stringify(savedUser))
        }
    }
    
    login(data: {userName: string, password: string}){
        return this.http.post(this.baseUrl + '/auth/login', data)
    }

    setUser(user: any){
        this.currentUser.next(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(){
        return this.currentUser.asObservable();
    }

    logout(){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.currentUser.next(null);
    }



}