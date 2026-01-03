import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PassengerFormComponent } from '../components/passenger-form/passenger-form.component';
import { Seat } from '../../../shared/models/seat.model';
import { BookingApi } from '../../../core/api/booking.api';
import { Passenger, BookingDraft } from '../../../shared/models/booking.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-booking-review',
  imports: [
    CommonModule,
    FormsModule,
    PassengerFormComponent
  ],
  providers: [BookingApi],
  templateUrl: './booking-review.component.html'
})
export class BookingReviewComponent {

  seats = signal<Seat[]>([]);
  passengers = signal<Passenger[]>([]);
  farePerSeat = 500; // TEMP (from trip API later)
  totalAmount = signal(0);
    
   
  constructor(
    private router: Router,
    private bookingApi: BookingApi
  ) {
    const nav = history.state;
    this.seats.set(nav.seats || []);
    this.passengers.set(
      this.seats().map(() => ({
        name: '',
        age: 18,
        gender: 'MALE'
      }))
    );
    this.calculateTotal();
  }

  updatePassenger(index: number, passenger: Passenger) {
    const data = [...this.passengers()];
    data[index] = passenger;
    this.passengers.set(data);
  }

  calculateTotal() {
    this.totalAmount.set(
      this.seats().length * this.farePerSeat
    );
  }

  proceedToPayment() {
  // 1. Prepare the full draft object for logging or local use
  const seatNumbers = this.seats().map(seat => seat.seatNumber);
  const draft: BookingDraft = {
    tripId: history.state.tripId,
    seats: seatNumbers,
    passengers: this.passengers(),
    totalAmount: this.totalAmount()
  };

  

  console.log('Sending payload to backend:', draft);

  // 3. IMPORTANT: Send 'payload', NOT 'draft'
  this.bookingApi.createDraft(draft)
    .subscribe({
      next: (res) => {
        this.router.navigate(
          ['/payment'],
          { state: { bookingId: res.bookingId } }
        );
      },
      error: (err) => {
        console.error('Error creating draft:', err);
      }
    });
  

      //this.router.navigate(
       //   ['/payment'],);
  }

  getSeatNumbersDisplay(): string {
    return this.seats().map((s: any) => s.seatNumber).join(', ');
  }

  confirmBooking() {
    // Map local state to the expected API format
    const routeId = history.state.tripId;
     const seatNumbers = this.seats().map(seat => seat.seatNumber);
          console.log(routeId ,seatNumbers) ;
    this.bookingApi.createBooking({routeId,seatNumbers}).subscribe({
      
      next: (response) => console.log('Booking successful!', response),
      error: (err) => console.error('Booking failed', err)
    });
  }

}
