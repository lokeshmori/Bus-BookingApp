package com.edigest.busbooking.booking.service;

import org.springframework.stereotype.Service;

import com.edigest.busbooking.booking.dto.BookingStatusResponse;
import com.edigest.busbooking.booking.entity.Booking;
import com.edigest.busbooking.booking.repository.BookingRepository;

@Service
public class BookingStatusService {

    private final BookingRepository bookingRepository;

    public BookingStatusService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public BookingStatusResponse getStatus(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        return new BookingStatusResponse(
                booking.getId(),
                booking.getStatus()
        );
    }
}

