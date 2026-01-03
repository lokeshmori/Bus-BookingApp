import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ CommonModule , FormsModule , RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  step: 'EMAIL' | 'OTP' | 'RESET' | 'SUCCESS' = 'EMAIL';

  loading = false;
  error = '';

  otpBoxes = Array(6);
  otp: string[] = [];
  countdown = 60;
  timer: any;

  newPassword = '';
  confirmPassword = '';

  /* STEP 1 */
  sendOtp(email: string) {
    if (!email) {
      this.error = 'Email is required';
      return;
    }

    this.loading = true;
    this.error = '';

    // API CALL
    setTimeout(() => {
      this.loading = false;
      this.step = 'OTP';
      this.startTimer();
    }, 1000);
  }

  /* OTP HANDLING */
  handleOtpInput(event: any, index: number) {
    this.otp[index] = event.target.value;
    event.target.nextElementSibling?.focus();
  }

  handleOtpKey(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otp[index]) {
      ((event.target as HTMLElement).previousElementSibling as HTMLElement)?.focus();


    }
  }

  startTimer() {
    this.countdown = 60;
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) clearInterval(this.timer);
    }, 1000);
  }

  resendOtp() {
    this.startTimer();
    alert('OTP resent');
  }

  verifyOtp() {
    if (this.otp.join('').length < 6) {
      this.error = 'Enter complete OTP';
      return;
    }

    this.loading = true;
    this.error = '';

    // API VERIFY
    setTimeout(() => {
      this.loading = false;
      clearInterval(this.timer);
      this.step = 'RESET';
    }, 1000);
  }

  /* RESET */
  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;
    this.error = '';

    // API RESET
    setTimeout(() => {
      this.loading = false;
      this.step = 'SUCCESS';
      setTimeout(() => {
        location.href = '/auth/login';
      }, 2000);
    }, 1000);
  }

}
