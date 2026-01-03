export interface Trip {
  tripId: number;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  fare: number;
  availableSeats: number;
}

export interface TripAdmin {
  id: number;
  route: string;
  bus: string;
  departure: string;
  fare: number;
}