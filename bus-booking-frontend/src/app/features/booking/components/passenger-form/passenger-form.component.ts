import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Passenger } from '../../../../shared/models/booking.model';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-passenger-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-form.component.html'
})
export class PassengerFormComponent {

  @Input({ required: true }) index!: number;
  @Output() passengerChange = new EventEmitter<Passenger>();

  passenger: Passenger = {
    name: '',
    age: 18,
    gender: 'MALE'
  };

  emitChange() {
    this.passengerChange.emit(this.passenger);
  }
}
