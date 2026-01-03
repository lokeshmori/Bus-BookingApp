import { CanActivate, CanActivateFn, UrlTree } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { TokenService } from '../auth/token.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    // 1. Check if user is logged in at all
    if (!this.tokenService.isLoggedIn()) {
      return this.handleUnauthorized();
    }

    // 2. Check if the token has actually expired
    if (this.tokenService.isTokenExpired()) {
      this.tokenService.clear(); // Wipe expired tokens
      return this.handleUnauthorized();
    }

    return true; // Token is valid and user is logged in
  }

  private handleUnauthorized(): UrlTree {
    // Returning a UrlTree is the modern 2025 standard for redirection in guards
    return this.router.parseUrl('/auth/login');
  }
}
