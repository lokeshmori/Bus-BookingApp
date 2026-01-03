export interface SeatEvent {
  tripId: number;
  seatId: number;
  status: 'AVAILABLE' | 'LOCKED' | 'BOOKED';
}
