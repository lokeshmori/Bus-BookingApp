package com.edigest.busbooking.booking.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edigest.busbooking.booking.dto.BookingStatusResponse;
import com.edigest.busbooking.booking.entity.Booking;
import com.edigest.busbooking.booking.repository.BookingRepository;
import com.edigest.busbooking.booking.service.BookingStatusService;

@RestController
@RequestMapping("/api/bookings")
public class BookingStatusController {


    private final BookingStatusService bookingStatusService;

    public BookingStatusController(BookingStatusService bookingStatusService) {
        this.bookingStatusService = bookingStatusService;
    }

    @GetMapping("/{bookingId}/status")
    public BookingStatusResponse getStatus(
            @PathVariable Long bookingId) {

        return bookingStatusService.getStatus(bookingId);
    }
}
