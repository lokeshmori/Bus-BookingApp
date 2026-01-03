package com.edigest.busbooking.booking.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateBookingRequest {

    private Long routeId;
    private List<String> seatNumbers ;
}
