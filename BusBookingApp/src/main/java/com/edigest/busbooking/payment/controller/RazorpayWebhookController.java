package com.edigest.busbooking.payment.controller;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edigest.busbooking.booking.entity.Booking;
import com.edigest.busbooking.booking.enums.BookingStatus;
import com.edigest.busbooking.booking.repository.BookingRepository;
import com.edigest.busbooking.payment.entity.Payment;
import com.edigest.busbooking.payment.enums.PaymentStatus;
import com.edigest.busbooking.payment.repository.PaymentRepository;

@RestController
@RequestMapping("/api/payments/webhook")
public class RazorpayWebhookController {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    public RazorpayWebhookController(
            PaymentRepository paymentRepository,
            BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    @PostMapping
    public ResponseEntity<String> handleWebhook(
            @RequestBody String payload,
            @RequestHeader("X-Razorpay-Signature") String signature)
            throws Exception {
                         System.out.println("WEB-Hook called");
        // TODO: Verify signature (important for production)

        JSONObject json = new JSONObject(payload);
        JSONObject paymentEntity = json
                .getJSONObject("payload")
                .getJSONObject("payment")
                .getJSONObject("entity");

        String orderId = paymentEntity.getString("order_id");
        String paymentId = paymentEntity.getString("id");

        Payment payment = paymentRepository
                .findByRazorpayOrderId(orderId)
                .orElseThrow();

        payment.setRazorpayPaymentId(paymentId);
        payment.setStatus(PaymentStatus.SUCCESS);
        paymentRepository.save(payment);

        Booking booking = bookingRepository
                .findById(payment.getBookingId())
                .orElseThrow();

        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);

        return ResponseEntity.ok("OK");
    }
}
