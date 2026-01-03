export interface Seat {
  seatId: number;
  seatNumber: string;
  price: number;
  status: 'AVAILABLE' | 'LOCKED' | 'BOOKED';
  isLadies: boolean;
  selected?: boolean;
}
