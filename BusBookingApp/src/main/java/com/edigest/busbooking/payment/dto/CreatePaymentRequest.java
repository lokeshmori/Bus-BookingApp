package com.edigest.busbooking.payment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreatePaymentRequest {
    private Long bookingId;
}
