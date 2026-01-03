export interface PaymentInitResponse {
  razorpayOrderId: string;
  amount: number;
  currency: string;
  key: string;
}

export interface PaymentStatus {
  status: 'SUCCESS' | 'FAILED';
  bookingReference: string;
}
