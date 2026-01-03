import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { BookingDraft, BookingStatusResponse } from '../../shared/models/booking.model';
import { BookingSummary, BookingTicket } from '../../shared/models/booking-history.model';
import { Observable } from 'rxjs';

const ACCESS_TOKEN = 'access_token';
const API_BASE_URL = 'http://localhost:8080/api';
export interface BookingPayload {
  routeId: number;
  seatNumbers: string[]; // Replace 'any' with your seat type if available
}
export class BookingApi {
  private http = inject(HttpClient);

  createDraft(payload: BookingDraft) {


    return this.http.post<{ bookingId: number }>(
      `${API_BASE_URL}/booking/draft`,
      payload
    );
  }

  getMyBookings() {
  return this.http.get<BookingSummary[]>(
    `${API_BASE_URL}/bookings/my`
  );
}

getTicket(bookingId: number) {
  return this.http.get<BookingTicket>(
    `${API_BASE_URL}/bookings/${bookingId}/ticket`
  );
}

 createBooking(bookingData: BookingPayload): Observable<any> {

    return this.http.post<any>(`${API_BASE_URL}/booking`, bookingData);
  }

  getBookingStatus(bookingId: number) {
    return this.http.get<BookingStatusResponse>(
      `${API_BASE_URL}/bookings/${bookingId}/status`
    );
  }

}
