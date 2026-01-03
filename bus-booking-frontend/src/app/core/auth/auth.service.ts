import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from '../api/auth.api';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  isAuthenticated = signal(false);

  constructor(
    private authApi: AuthApi,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.isAuthenticated.set(this.tokenService.isLoggedIn());
  }

  login(email: string, password: string) {
    return this.authApi.login({ email, password });
  }
register(fullName:string,email: string, password: string) {
    return this.authApi.register({fullName, email, password });
  }

  
  handleLoginSuccess(response: any) {
  console.log('Login response:', response);

  // Adjust keys to EXACT backend response
  const accessToken =
    response.accessToken ||
    response.token ||
    response.access_token;

  if (!accessToken) {
    throw new Error('No access token received from backend');
  }

  this.tokenService.setTokens(
    accessToken.replace('Bearer ', ''),
    response.refreshToken
  );

  this.isAuthenticated.set(true);
  this.router.navigate(['/']);
}

  
  logout() {
    this.tokenService.clear();
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth/login']);
  }
}
