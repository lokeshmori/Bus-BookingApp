import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Seat } from '../../../../shared/models/seat.model';
import { SeatComponent } from '../seat/seat.component';

@Component({
  standalone: true,
  selector: 'app-seat-map',
  imports: [CommonModule, SeatComponent],
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss']
})
export class SeatMapComponent {

  @Input({ required: true }) seats: Seat[] = [];
  @Output() seatToggled = new EventEmitter<Seat>();

  driverSide: 'LEFT' | 'RIGHT' = 'RIGHT';

  onSeatToggle(seat: Seat) {
    this.seatToggled.emit(seat);
  }
}
