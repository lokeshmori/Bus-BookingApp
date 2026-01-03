package com.edigest.busbooking.payment.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PaymentInitResponse {

    private String razorpayOrderId;
    private BigDecimal amount;
    private String currency;
    private String key;
}