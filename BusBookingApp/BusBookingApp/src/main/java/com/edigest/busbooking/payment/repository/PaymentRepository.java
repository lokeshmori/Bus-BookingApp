package com.edigest.busbooking.payment.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edigest.busbooking.payment.entity.Payment;

public interface PaymentRepository
extends JpaRepository<Payment, Long> {

Optional<Payment> findByRazorpayOrderId(String orderId);
}
