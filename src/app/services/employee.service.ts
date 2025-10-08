import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Employee{
    name: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    department: string,
}

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
    baseUrl = `${environment.apiUrl}/Employee`
    constructor(private http: HttpClient){}

    getAllEmployees() : Observable<Employee[]>{
        alert('getAllEmployees metodu çalıştı. Apiye istemeye gidiyor.')
        return this.http.get<Employee[]>(this.baseUrl)
    }
}