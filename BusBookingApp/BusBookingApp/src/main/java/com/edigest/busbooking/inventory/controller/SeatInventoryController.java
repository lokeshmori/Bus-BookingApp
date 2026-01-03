package com.edigest.busbooking.inventory.controller;

import java.security.Principal;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edigest.busbooking.inventory.dto.LockRequest;
import com.edigest.busbooking.inventory.service.SeatInventoryService;

@RestController

public class SeatInventoryController {

    private final SeatInventoryService service;

    public SeatInventoryController(SeatInventoryService service) {
        this.service = service;
    }

    @MessageMapping("/seats/lock") 
    public void lockSeat(LockRequest request ) {
        
    	// String userId = principal.getName(); 
        service.lockSeat(request.getTripId(), request.getSeatId(), "1");
    }

    @MessageMapping("/seats/unlock")
    public void releaseSeat(LockRequest request) {
        service.releaseSeat(request.getTripId() ,request.getSeatId());
    }

}
