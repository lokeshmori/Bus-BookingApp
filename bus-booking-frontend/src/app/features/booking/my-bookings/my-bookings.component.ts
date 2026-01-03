import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingApi } from '../../../core/api/booking.api';
import { BookingSummary } from '../../../shared/models/booking-history.model';

 const MOCK_BOOKINGS: BookingSummary[] = [
  {
    bookingId: 101,
    bookingReference: 'BK-77291',
    source: 'London (LHR)',
    destination: 'New York (JFK)',
    travelDate: '2025-03-15',
    seats: ['12A', '12B'],
    totalAmount: 1250.00,
    status: 'CONFIRMED'
  },
  {
    bookingId: 102,
    bookingReference: 'BK-11023',
    source: 'Paris (CDG)',
    destination: 'Tokyo (NRT)',
    travelDate: '2025-04-02',
    seats: ['05C'],
    totalAmount: 890.50,
    status: 'CANCELLED'
  },
  {
    bookingId: 103,
    bookingReference: 'BK-99482',
    source: 'Dubai (DXB)',
    destination: 'Singapore (SIN)',
    travelDate: '2025-05-20',
    seats: ['21D', '21E', '21F'],
    totalAmount: 2100.00,
    status: 'CONFIRMED'
  }
];

@Component({
  standalone: true,
  selector: 'app-my-bookings',
  imports: [CommonModule],
  providers: [BookingApi],
  templateUrl: './my-bookings.component.html'
})
export class MyBookingsComponent {

  bookings = signal<BookingSummary[]>(MOCK_BOOKINGS);
  loading = signal(true);

  constructor(
    private bookingApi: BookingApi,
    private router: Router
  ) {
    this.bookingApi.getMyBookings()
      .subscribe(res => {
        this.bookings.set(res);
        this.loading.set(false);
      });
  }

  viewTicket(bookingId: number) {
    this.router.navigate(['/booking/ticket', bookingId]);
  }
}
