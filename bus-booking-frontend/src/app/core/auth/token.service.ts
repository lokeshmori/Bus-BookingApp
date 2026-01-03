import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

interface MyJwtPayload {
  sub?: string;
  email?: string;
  role?: 'ADMIN' | 'USER';
  exp?: number;
}

@Injectable({ providedIn: 'root' })
export class TokenService {

  setTokens(access: string, refresh?: string) {
    if (!access || !access.includes('.')) {
      console.error('Invalid access token received:', access);
      return;
    }

    localStorage.setItem(ACCESS_TOKEN, access);

    if (refresh) {
      localStorage.setItem(REFRESH_TOKEN, refresh);
    }
  }

  getAccessToken(): string | null {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token || token.split('.').length !== 3) {
      return null;
    }
    return token;
  }
   getRefreshToken(): string | null {
     const token = localStorage.getItem(REFRESH_TOKEN);
    if (!token || token.split('.').length !== 3) {
      return null;
    }
    return token;
   }


  clear() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  private getDecodedToken(): MyJwtPayload | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      return jwtDecode<MyJwtPayload>(token);
    } catch (err) {
      console.error('JWT decode failed:', err);
      return null;
    }
  }

  getUserRole(): 'ADMIN' | 'USER' | null {
    return this.getDecodedToken()?.role ?? null;
  }

  getUsername(): string {
    const payload = this.getDecodedToken();
    return payload?.email || payload?.sub || 'User';
  }

  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    const { exp } = jwtDecode<any>(token);
    return Date.now() >= exp * 1000;
  }
}
