export interface BookingSummary {
  bookingId: number;
  bookingReference: string;
  source: string;
  destination: string;
  travelDate: string;
  seats: string[];
  totalAmount: number;
  status: 'CONFIRMED' | 'CANCELLED';
}

export interface BookingTicket {
  bookingReference: string;
  passengerDetails: {
    name: string;
    age: number;
    gender: string;
    seatNumber: string;
  }[];
  busType: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  totalAmount: number;
}
