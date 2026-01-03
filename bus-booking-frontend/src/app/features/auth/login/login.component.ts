import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule , RouterLink , FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = signal(false);
  error = signal('');
// showPassword = false;

  constructor(private authService: AuthService) {}

  login(email: string, password: string) {
    this.loading.set(true);
    this.error.set('');
console.log(email,password);
    this.authService.login(email, password)
      .subscribe({
        next: res => this.authService.handleLoginSuccess(res),
        error: () => {
          this.error.set('Invalid credentials');
          this.loading.set(false);
        }
      });
  }
}
