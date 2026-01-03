import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { SeatLayoutSeat } from '../../../shared/models/seat-layout.model';
import { FormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-seat-layout',
  imports: [CommonModule, DragDropModule,FormsModule ],
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.scss']
})
export class SeatLayoutComponent {

  
  // GRID CONFIG
  rows = 8;
  cols = 4;

  // GLOBAL STATE
  deck: 'LOWER' | 'UPPER' = 'LOWER';
  driverSide: 'LEFT' | 'RIGHT' = 'LEFT';

  // DATA
  seats = signal<SeatLayoutSeat[]>([]);
  validationErrors = signal<string[]>([]);

  /* --------------------------------
   * GRID HELPERS
   * -------------------------------- */

  getRowLabel(row: number): string {
    return String.fromCharCode(65 + row); // A, B, C...
  }

  getSeatAt(row: number, col: number) {
    return this.seats().find(
      s => s.row === row && s.col === col && s.deck === this.deck
    );
  }

  /* --------------------------------
   * SEAT OPERATIONS
   * -------------------------------- */

  addSeat(row: number, col: number) {
    if (this.getSeatAt(row, col)) return;

    this.seats.update(seats => {
      const label = `${this.getRowLabel(row)}${col + 1}`;

      return [
        ...seats,
        {
          id: crypto.randomUUID(),
          label,
          row,
          col,
          type: 'SEATER',
          ladies: false,
          price: 500,
          deck: this.deck
        }
      ];
    });
  }

  removeSeat(seatId: string) {
    this.seats.update(seats =>
      seats.filter(s => s.id !== seatId)
    );
  }

  toggleLadies(seatId: string) {
    this.seats.update(seats =>
      seats.map(s =>
        s.id === seatId
          ? { ...s, ladies: !s.ladies }
          : s
      )
    );
  }

  changeSeatType(seatId: string) {
    this.seats.update(seats =>
      seats.map(s =>
        s.id === seatId
          ? { ...s, type: s.type === 'SEATER' ? 'SLEEPER' : 'SEATER' }
          : s
      )
    );
  }

  updateSeatPrice(seatId: string, price: number) {
    this.seats.update(seats =>
      seats.map(s =>
        s.id === seatId
          ? { ...s, price }
          : s
      )
    );
  }

  /* --------------------------------
   * DECK / DRIVER SIDE
   * -------------------------------- */

  switchDeck(deck: 'LOWER' | 'UPPER') {
    this.deck = deck;
  }

  setDriverSide(side: 'LEFT' | 'RIGHT') {
    this.driverSide = side;
  }

  /* --------------------------------
   * VALIDATION & PREVIEW
   * -------------------------------- */

  previewLayout() {
    this.validateLayout();
  }

  validateLayout() {
    const errors: string[] = [];
    const deckSeats = this.seats().filter(s => s.deck === this.deck);

    if (deckSeats.length === 0) {
      errors.push(`No seats added on ${this.deck} deck.`);
    }

    if (!deckSeats.some(s => s.ladies)) {
      errors.push(`At least one ladies seat is recommended on ${this.deck} deck.`);
    }

    const duplicateLabels = deckSeats
      .map(s => s.label)
      .filter((l, i, arr) => arr.indexOf(l) !== i);

    if (duplicateLabels.length) {
      errors.push('Duplicate seat labels detected.');
    }

    this.validationErrors.set(errors);
    return errors.length === 0;
  }

  /* --------------------------------
   * SAVE
   * -------------------------------- */

  saveLayout() {
    if (!this.validateLayout()) return;

    const layout = {
      rows: this.rows,
      cols: this.cols,
      driverSide: this.driverSide,
      decks: {
        LOWER: this.seats().filter(s => s.deck === 'LOWER'),
        UPPER: this.seats().filter(s => s.deck === 'UPPER')
      }
    };

    console.log('Seat Layout JSON:', layout);
    // TODO: POST to backend
  }

}
