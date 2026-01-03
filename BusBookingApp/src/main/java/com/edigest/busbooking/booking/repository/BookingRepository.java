package com.edigest.busbooking.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edigest.busbooking.booking.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}

