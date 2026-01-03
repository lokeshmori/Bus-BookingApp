import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Trip } from '../../../../shared/models/trip.model';

@Component({
  standalone: true,
  selector: 'app-trip-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss']
})
export class TripCardComponent {
  @Input({ required: true }) trip!: Trip;
}
