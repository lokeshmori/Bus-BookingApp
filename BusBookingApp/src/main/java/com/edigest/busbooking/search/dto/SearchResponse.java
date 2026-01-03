package com.edigest.busbooking.search.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SearchResponse {
	
	    private Long tripId;
	    private String busType;
	    private int availableSeats;
	    private LocalDateTime departureTime;
	    private LocalDateTime arrivalTime;
	    private BigDecimal fare;

}
