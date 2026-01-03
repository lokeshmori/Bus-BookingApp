import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { interval, Subscription, switchMap, takeWhile } from 'rxjs';
import { BookingApi } from '../../../core/api/booking.api';

@Component({
  standalone: true,
  selector: 'app-payment-status',
  imports: [CommonModule],
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})

export class PaymentStatusComponent implements OnDestroy {

  bookingId!: number;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'CANCELLED' = 'PENDING';

  private pollSub!: Subscription;
  private readonly MAX_ATTEMPTS = 15; // 15 × 2s = 30 seconds
  private attempts = 0;

  constructor(
    private router: Router,
    private bookingApi: BookingApi
  ) {
    const state = history.state;
    this.bookingId = state.bookingId;

    if (!this.bookingId) {
      this.router.navigate(['/']);
      return;
    }

    this.startPolling();
    console.log("p-status");
  }

  startPolling() {
    this.pollSub = interval(2000)
      .pipe(
        switchMap(() =>
          this.bookingApi.getBookingStatus(this.bookingId)
        ),
        takeWhile(res => {
          this.status = res.status;
          this.attempts++;
          return res.status === 'PENDING' && this.attempts < this.MAX_ATTEMPTS;
        }, true)
      )
      .subscribe(res => {
        this.status = res.status;

        if (res.status === 'CONFIRMED') {
          this.router.navigate(['/booking/success'], {
            state: { bookingId: this.bookingId }
          });
        }

        if (res.status === 'FAILED' || res.status === 'CANCELLED') {
          this.router.navigate(['/booking/failed']);
        }
      });
  }

  ngOnDestroy() {
    this.pollSub?.unsubscribe();
  }
}
