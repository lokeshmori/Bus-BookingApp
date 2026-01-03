package com.edigest.busbooking.payment.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edigest.busbooking.payment.dto.CreatePaymentRequest;
import com.edigest.busbooking.payment.dto.PaymentInitResponse;
import com.edigest.busbooking.payment.entity.Payment;
import com.edigest.busbooking.payment.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public PaymentInitResponse createOrder(
            @RequestBody CreatePaymentRequest request)
            throws Exception {

        return paymentService.createOrder(request.getBookingId());
    }
}
