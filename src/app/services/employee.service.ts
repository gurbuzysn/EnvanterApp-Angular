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
    Title: string,
    ProfileImage?: File
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


        const formData = new FormData();
        formData.append('FirstName', employee.FirstName);
        formData.append('LastName', employee.LastName);
        formData.append('Email', employee.Email);
        formData.append('PhoneNumber', employee.PhoneNumber);
        formData.append('Department', employee.Department);
        formData.append('Title', employee.Title);
        if (employee.ProfileImage) {
            formData.append('ProfileImage', employee.ProfileImage);
        }

        return this.http.post<Employee>(this.baseUrl, formData)
    }

}