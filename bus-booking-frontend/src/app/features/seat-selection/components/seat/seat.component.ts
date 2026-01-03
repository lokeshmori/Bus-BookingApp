import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Seat } from '../../../../shared/models/seat.model';

@Component({
  standalone: true,
  selector: 'app-seat',
  imports: [CommonModule],
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss']
})
export class SeatComponent {

  @Input({ required: true }) seat!: Seat;
  @Output() toggle = new EventEmitter<Seat>();

 
  onClick() {
  if (this.seat.status === 'BOOKED') return;
  this.toggle.emit(this.seat);
}

}
