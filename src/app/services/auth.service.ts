import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralResponse } from './models/general-response.model';
import { LoginRequest } from './models/login-request.model';
import { LoginResponse } from './models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7206/api/Auth/login';

  constructor(private http: HttpClient) { }

  /**
   * Login user with username and password
   * @param username - Username
   * @param password - Password
   * @returns Observable of GeneralResponse containing LoginResponse
   */
  login(username: string, password: string): Observable<GeneralResponse<LoginResponse>> {
    const request: LoginRequest = {
      uname: username,
      password: password
    };

    return this.http.post<GeneralResponse<LoginResponse>>(this.apiUrl, request);
  }
}
