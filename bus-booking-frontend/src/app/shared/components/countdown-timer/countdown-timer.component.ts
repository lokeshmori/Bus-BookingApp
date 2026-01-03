import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-countdown-timer',
  imports: [CommonModule],
  templateUrl: './countdown-timer.component.html'
})
export class CountdownTimerComponent {

  @Input({ required: true }) milliseconds!: number;

  get minutes() {
    return Math.floor(this.milliseconds / 60000);
  }

  get seconds() {
    return Math.floor((this.milliseconds % 60000) / 1000);
  }
}
