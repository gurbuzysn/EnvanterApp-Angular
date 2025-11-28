import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class CategoryService{
    private baseUrl = `${environment.apiUrl}/Category`

    constructor(private http: HttpClient){}

    addCategory(categoryName: string, imageFile: File | null): Observable<any>{
        const formData = new FormData();
        formData.append('categoryName', categoryName);
        if (imageFile) {
            formData.append('categoryImage', imageFile, imageFile.name);
        }
        
        return this.http.post(`${this.baseUrl}`, formData);
    }
}

