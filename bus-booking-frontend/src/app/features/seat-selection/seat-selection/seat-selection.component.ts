import { Component, signal, effect, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatMapComponent } from '../components/seat-map/seat-map.component';
import { Seat } from '../../../shared/models/seat.model';
import { SeatSocketService } from '../../../core/services/seat-socket.service';
import { SeatTimerService } from '../../../core/services/seat-timer.service';
import { CountdownTimerComponent } from '../../../shared/components/countdown-timer/countdown-timer.component';
import { TokenService } from '../../../core/auth/token.service';



@Component({
  standalone: true,
  selector: 'app-seat-selection',
  imports: [CommonModule, SeatMapComponent ,CountdownTimerComponent],
  templateUrl: './seat-selection.component.html'
})
export class SeatSelectionComponent {


  tripId!: number;
  seats = signal<Seat[]>([]);
  selectedSeats = signal<number[]>([]);

 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private socket: SeatSocketService,
  public timer: SeatTimerService ,
    
)  {
    this.tripId = Number(this.route.snapshot.paramMap.get('tripId'));
    this.loadMockSeats();
    this.socket.connect(this.tripId);

    effect(() => {
  if (this.timer.countdown() === 0) {
    this.selectedSeats().forEach(id =>
      this.socket.unlockSeat(this.tripId, id)
    );
    this.selectedSeats.set([]);
  }
});

  }
   

 toggleSeat(seat: Seat) {
  if (seat.status !== 'AVAILABLE') return;

  const selected = this.selectedSeats();

  if (selected.includes(seat.seatId)) {
    this.socket.unlockSeat(this.tripId, seat.seatId);
    this.selectedSeats.set(selected.filter(id => id !== seat.seatId));
  } else {
    this.socket.lockSeat(this.tripId, seat.seatId ,"101");
    const updated = [...selected, seat.seatId];
    this.selectedSeats.set(updated);
    this.timer.start(updated);
  }
}

proceed() {
  const selectedSeatIds = this.selectedSeats();

 if (!selectedSeatIds.length) return;

  // Pause timer so seats are not auto-released
   // this.timer.pause();

  // Build full seat objects for booking-review
  const selectedSeatObjects = this.seats()
    .filter(seat => selectedSeatIds.includes(seat.seatId))
    .map(seat => ({
      ...seat,
      selected: true
    }));

  // Navigate to booking-review with required state
  this.router.navigate(
    ['/booking'],
    {
      state: {
        tripId: this.tripId,
        seats: selectedSeatObjects
      }
    }
  );
}



  loadMockSeats() {
    
    this.seats.set(
      Array.from({ length: 32 }).map((_, i) => ({
        seatId: i + 1,
        seatNumber: `${i + 1}`,
        price :206,
        status: 'AVAILABLE',
        isLadies: false
      }))
    );
  }

 ngOnDestroy() {
  this.selectedSeats().forEach(id =>
    this.socket.unlockSeat(this.tripId, id)
  );
  this.timer.clear();
  this.socket.disconnect();
}

}
