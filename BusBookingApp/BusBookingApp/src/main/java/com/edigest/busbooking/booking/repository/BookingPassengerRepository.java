package com.edigest.busbooking.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edigest.busbooking.booking.entity.BookingPassenger;

public interface BookingPassengerRepository
extends JpaRepository<BookingPassenger, Long> {
}
