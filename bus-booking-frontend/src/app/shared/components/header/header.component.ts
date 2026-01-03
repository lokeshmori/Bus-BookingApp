import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TokenService } from '../../../core/auth/token.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule,RouterLink ],
   templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HeaderComponent {
 
  mobileOpen = false;

  constructor(
    public auth: AuthService,
    private tokenService: TokenService
  ) {}

  get username(): string {
    return  this.tokenService.getUsername();
  }

  get isAdmin(): boolean {
  return this.auth.isAuthenticated() &&
         this.tokenService.getUserRole() === 'ADMIN';
}


  logout() {
    this.auth.logout();
    this.mobileOpen = false;
  }
}
