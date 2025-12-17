import { Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class AuthService{
    private baseUrl = environment.apiUrl;
    currentUser = signal<any | null>(null);

    constructor(private http: HttpClient){
        const savedUser = localStorage.getItem('user');
        if(savedUser){
            this.currentUser.set(JSON.parse(savedUser))
        }
    }
    
    login(data: {userName: string, password: string}): Observable<any>{
        return this.http.post(this.baseUrl + '/auth/login', data)
    }

    setUser(user: any){
        const safeUser ={
            id: user.id,
            userName: user.userName,
            token: user.token
        }

        this.currentUser.set(user);
        localStorage.setItem('user', JSON.stringify(safeUser));
    }

    getUser(){
        return this.currentUser();
    }

    logout(){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.currentUser.set(null);
    }
}