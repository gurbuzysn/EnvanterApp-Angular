import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Employee{
    Id : string,
    FirstName: string,
    LastName: string,
    Email: string,
    PhoneNumber: string,
    Department: string,
    Title: string,
    ProfileImage?: string
}

export interface GeneralResponse<T>{
    IsSuccess: boolean;
    Message: string;
    Result: T;
    HttpStatusCode: number;
}




@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
    baseUrl = `${environment.apiUrl}/Employee`
    constructor(private http: HttpClient){}

    getAllEmployees() : Observable<Employee[]>{ return this.http.get<Employee[]>(this.baseUrl) }

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

    removeEmployee(id : string) : Observable<GeneralResponse<null>>{
        return this.http.delete<GeneralResponse<null>>(`${this.baseUrl}/${id}`);
    }

    updateEmployee(id: string, employee: Employee) {
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

        return this.http.put<Employee>(`${this.baseUrl}/${id}`, formData);
    }

}