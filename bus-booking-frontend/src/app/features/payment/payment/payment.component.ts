import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentApi } from '../../../core/api/payment.api';

declare var Razorpay: any;
@Component({
  standalone: true,
  selector: 'app-payment',
  imports: [CommonModule],
  providers: [PaymentApi],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent {
 
  loading = signal(true);
  bookingId!: number;

  constructor(
    private router: Router,
    private paymentApi: PaymentApi
  ) {
    this.bookingId = history.state.bookingId;

    if (!this.bookingId) {
      this.router.navigate(['/']);
      return;
    }

    this.startPayment();
  }

  startPayment() {
    this.paymentApi.initiatePayment(this.bookingId)
      .subscribe({
        next: res => {
          this.loading.set(false);
          this.openRazorpay(res);
        },
        error: () => {
          this.router.navigate(['/payment/status'], {
            state: { status: 'FAILED' }
          });
        }
      });
  }

  openRazorpay(res: any) {

    const options = {
      key: res.key,                       // Razorpay public key
      amount: res.amount * 100,           // paise
      currency: res.currency,
      name: 'Bus Booking',
      description: 'Ticket Payment',
      order_id: res.razorpayOrderId,

      handler: () => {
        // IMPORTANT:
        // Do NOTHING here except redirect.
        // Backend webhook will confirm payment.
        this.router.navigate(
          ['/payment/status'],
          { state: { status: 'PROCESSING', bookingId: this.bookingId } }
        );
      },

      modal: {
        ondismiss: () => {
          this.router.navigate(
            ['/payment/status'],
            { state: { status: 'CANCELLED' } }
          );
        }
      },

      theme: {
        color: '#1976d2'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }


}
