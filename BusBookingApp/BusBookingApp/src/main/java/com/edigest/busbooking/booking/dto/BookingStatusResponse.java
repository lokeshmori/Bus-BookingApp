package com.edigest.busbooking.booking.dto;

import com.edigest.busbooking.booking.enums.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BookingStatusResponse {
    private Long bookingId;
    private BookingStatus status;
}