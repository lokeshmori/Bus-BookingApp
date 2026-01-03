package com.edigest.busbooking.inventory.service;

import java.time.Duration;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.edigest.busbooking.inventory.dto.SeatEvent;
import com.edigest.busbooking.inventory.repository.RouteSeatRepository;

@Service
public class SeatInventoryService {
	
	    private final RouteSeatRepository repository;
	    private final RedisTemplate<String, String> redisTemplate;
	    private final SimpMessagingTemplate messagingTemplate;

	    public SeatInventoryService(RouteSeatRepository repository,
	                                RedisTemplate<String, String> redisTemplate,
	                                SimpMessagingTemplate messagingTemplate) {
	        this.repository = repository;
	        this.redisTemplate = redisTemplate;
	        this.messagingTemplate = messagingTemplate;
	    }
	    
	    public void lockSeat(Long routeId, String seatNumber, String userId) {

	        String key = "seat:" + routeId + ":" + seatNumber;
             System.out.println(key +":"+ seatNumber +"locked SeatNumber");
	        Boolean success = redisTemplate
	                .opsForValue()
	                .setIfAbsent(key, userId, Duration.ofMinutes(5));
	        System.out.println(key +"Saved in redis "+ redisTemplate.opsForValue().get(key));
	        if (Boolean.FALSE.equals(success)) {
	            throw new RuntimeException("Seat already locked");
	        }

	        SeatEvent event = new SeatEvent(routeId, seatNumber, "LOCKED");
	        messagingTemplate.convertAndSend("/topic/seats/" + routeId, event);
	    }

	    public void releaseSeat(Long routeId, String seatNumber) {
	        redisTemplate.delete("seat:" + routeId + ":" + seatNumber);
	        System.out.println(seatNumber +"unlocked");
	        SeatEvent event = new SeatEvent(routeId, seatNumber, "AVAILABLE");
	        messagingTemplate.convertAndSend(
	                "/topic/seats/" + routeId,
	                event
	        );
	    }

	
}
