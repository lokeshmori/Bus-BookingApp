package com.edigest.busbooking.booking.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BookingDraftRequest {

    private Long tripId;
    private List<String> seats;
    private List<PassengerDto> passengers;
    private BigDecimal totalAmount;
}
