import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';

const API_BASE_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' }) // REQUIRED
export class AuthApi {

  private http = inject(HttpClient);

  login(payload: { email: string; password: string }) {
    return this.http.post<{
      accessToken: string;
      refreshToken: string;
    }>(`${API_BASE_URL}/auth/login`, payload);
  }
  register(payload:{ fullName:string, email: string; password: string }){
      return this.http.post<{message:string}>(`${API_BASE_URL}/auth/register`,payload);
  }
}
