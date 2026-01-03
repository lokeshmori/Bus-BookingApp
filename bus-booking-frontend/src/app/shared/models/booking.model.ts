import { Seat } from './seat.model';

export interface Passenger {
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
}

export interface BookingDraft {
  tripId: number;
  seats: string[];
  passengers: Passenger[];
  totalAmount: number;
}

export interface BookingStatusResponse {
  bookingId: number;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'CANCELLED';
}
