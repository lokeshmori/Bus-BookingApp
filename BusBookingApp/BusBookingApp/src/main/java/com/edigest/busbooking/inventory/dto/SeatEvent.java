package com.edigest.busbooking.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class SeatEvent {

	    private Long tripId;
	    private String seatId;
	    private String status;
	    
}
