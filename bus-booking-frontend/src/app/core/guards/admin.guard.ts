import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { TokenService } from '../auth/token.service';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class adminGuard {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as string[];
    const userRole = this.tokenService.getUserRole();

    if (!userRole || !allowedRoles.includes(userRole)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}

