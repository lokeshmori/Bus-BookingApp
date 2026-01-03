import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink ,FormsModule ,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
   loading = signal(false);
  error = signal('');
  successMessage = signal('');

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  register(name: string, email: string, password: string) {
    this.loading.set(true);
    this.error.set('');
    this.successMessage.set('');

    this.authService.register(name, email, password).subscribe({
      next: (res) => {
        console.log('Registration Success:', res);
        this.loading.set(false);
        this.successMessage.set(res.message+'! Redirecting to login...');
          console.log(res);
        // Wait 2 seconds so the user can see the success message
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (err) => {
        this.loading.set(false);
         console.error('Registration Error:', err);
        // Display specific error from controller if available, else fallback
        const errorMessage = err?.error || 'User already registered with this email';
        this.error.set(errorMessage);
      }
    });
  }

}
