import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookingApi } from '../../../core/api/booking.api';
import { BookingTicket } from '../../../shared/models/booking-history.model';


  

@Component({
  standalone: true,
  selector: 'app-ticket',
  imports: [CommonModule],
  providers: [BookingApi],
  templateUrl: './ticket.component.html'
})
export class TicketComponent {

  ticket = signal<BookingTicket | null>({
    bookingReference: 'BT-2025-X89',
    passengerDetails: [
      { name: 'John Doe', age: 28, gender: 'Male', seatNumber: 'A1' },
      { name: 'Jane Doe', age: 26, gender: 'Female', seatNumber: 'A2' }
    ],
    busType: 'AC Sleeper',
    source: 'Mumbai',
    destination: 'Goa',
    departureTime: '2025-12-25T21:00:00Z',
    arrivalTime: '2025-12-26T07:30:00Z',
    totalAmount: 2400.00
  });

  constructor(
    private route: ActivatedRoute,
    private bookingApi: BookingApi
  ) {
    const bookingId = Number(
      this.route.snapshot.paramMap.get('bookingId')
    );

    this.bookingApi.getTicket(bookingId)
      .subscribe(res => this.ticket.set(res));
  }

  print() {
    window.print();
  }
}
