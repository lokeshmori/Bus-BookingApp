package com.edigest.busbooking.booking.controller;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edigest.busbooking.auth.entity.User;
import com.edigest.busbooking.auth.repository.UserRepository;
import com.edigest.busbooking.auth.service.AuthService;
import com.edigest.busbooking.booking.dto.BookingDraftRequest;
import com.edigest.busbooking.booking.dto.BookingDraftResponse;
import com.edigest.busbooking.booking.dto.CreateBookingRequest;
import com.edigest.busbooking.booking.entity.Booking;
import com.edigest.busbooking.booking.service.BookingDraftService;
import com.edigest.busbooking.booking.service.BookingService;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    private final BookingService bookingService;
	private BookingDraftService bookingDraftService;
	private AuthService auth ;

    public BookingController( AuthService auth, BookingService bookingService , BookingDraftService bookingDraftService) {
        this.bookingService = bookingService;
        this.bookingDraftService = bookingDraftService;
        this.auth = auth ;
    }

    @PostMapping("/draft")
    public BookingDraftResponse createDraft( @RequestBody BookingDraftRequest request ,Authentication authentication
           ) {
    	 System.out.println(request.getTripId() +" booking controller "+ request.getSeats());
    	 
    	 String email = authentication.getName(); 
    	 
    	    System.out.println("Authenticated Email: " + email);

    	    
    	 //  User user = auth.GetUserDetails(email) ;
            Long userId = 1L; // map email → userId later

        Long bookingId =
                bookingDraftService.createDraft(userId, request);

        return new BookingDraftResponse(bookingId);
    
       
    }
    
    @PostMapping
    public Booking createBooking(@RequestBody
            CreateBookingRequest request) {
         System.out.println(request.getRouteId() +" booking controller "+ request.getSeatNumbers());
      //  String email = authentication.getName();
        Long userId = 1L; // map email → userId (improve later)

        return bookingService.createBooking(userId, request);
    }
}
