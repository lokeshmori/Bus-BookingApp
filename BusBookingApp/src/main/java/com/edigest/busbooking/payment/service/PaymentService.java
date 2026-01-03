package com.edigest.busbooking.payment.service;

import java.math.BigDecimal;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.edigest.busbooking.booking.entity.Booking;
import com.edigest.busbooking.booking.repository.BookingRepository;
import com.edigest.busbooking.payment.dto.PaymentInitResponse;
import com.edigest.busbooking.payment.entity.Payment;
import com.edigest.busbooking.payment.enums.PaymentStatus;
import com.edigest.busbooking.payment.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
@Service
public class PaymentService {

    private final RazorpayClient razorpayClient;
    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    @Value("${razorpay.key}")
    private String razorpayKey;

    public PaymentService(
            RazorpayClient razorpayClient,
            PaymentRepository paymentRepository,
            BookingRepository bookingRepository) {
        this.razorpayClient = razorpayClient;
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    public PaymentInitResponse createOrder(Long bookingId) throws Exception {

        Booking booking = bookingRepository
                .findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        JSONObject options = new JSONObject();
        options.put("amount", booking.getTotalAmount().multiply(BigDecimal.valueOf(100))); // paise
        options.put("currency", "INR");
        options.put("receipt", "booking_" + bookingId);

        Order order = razorpayClient.orders.create(options);

        // Save payment record
        Payment payment = new Payment();
        payment.setBookingId(bookingId);
        payment.setRazorpayOrderId(order.get("id"));
        payment.setAmount(booking.getTotalAmount());
        payment.setStatus(PaymentStatus.CREATED);

        paymentRepository.save(payment);

        // RETURN FRONTEND-CONTRACT RESPONSE
        return new PaymentInitResponse(
                order.get("id"),
                booking.getTotalAmount(),
                "INR",
                razorpayKey
        );
    }
}
