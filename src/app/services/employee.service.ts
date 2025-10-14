import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Employee{
    FirstName: string,
    LastName: string,
    Email: string,
    PhoneNumber: string,
    Department: string,
    Position: string
}

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
    baseUrl = `${environment.apiUrl}/Employee`
    constructor(private http: HttpClient){}

    getAllEmployees() : Observable<Employee[]>{
        return this.http.get<Employee[]>(this.baseUrl)
    }


    addEmployee(employee: Employee): Observable<Employee>{
        alert("EmployeeService içindeki addEmployee metodu çalıştı");
        return this.http.post<Employee>(this.baseUrl, employee)
    }

}