package com.edigest.busbooking.inventory.dto;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LockRequest {

	private Long tripId;
    private String seatId;
    private String userId ;
    
}
