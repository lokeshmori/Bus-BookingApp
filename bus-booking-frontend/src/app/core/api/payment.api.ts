import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { PaymentInitResponse, PaymentStatus } from '../../shared/models/payment.model';

const API_BASE_URL = 'http://localhost:8080/api';

export class PaymentApi {
  private http = inject(HttpClient);

  initiatePayment(bookingId: number) {
    return this.http.post<PaymentInitResponse>(
      `${API_BASE_URL}/payments/create-order`,
      { bookingId }
    );
  }

}
