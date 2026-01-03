package com.edigest.busbooking.booking.service;

import java.math.BigDecimal;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.edigest.busbooking.booking.dto.CreateBookingRequest;
import com.edigest.busbooking.booking.entity.Booking;
import com.edigest.busbooking.booking.entity.BookingSeat;
import com.edigest.busbooking.booking.enums.BookingStatus;
import com.edigest.busbooking.booking.repository.BookingRepository;
import com.edigest.busbooking.booking.repository.BookingSeatRepository;
import com.edigest.busbooking.inventory.entity.RouteSeat;
import com.edigest.busbooking.inventory.repository.RouteSeatRepository;

import jakarta.transaction.Transactional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingSeatRepository bookingSeatRepository;
    private final RouteSeatRepository routeSeatRepository;
    private final RedisTemplate<String, String> redisTemplate;

    public BookingService(
            BookingRepository bookingRepository,
            BookingSeatRepository bookingSeatRepository,
            RouteSeatRepository routeSeatRepository,
            RedisTemplate<String, String> redisTemplate) {

        this.bookingRepository = bookingRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.routeSeatRepository = routeSeatRepository;
        this.redisTemplate = redisTemplate;
    }

      
    
    @Transactional
    public Booking createBooking(
            Long userId,
            CreateBookingRequest request) {

        // 1. Validate seat locks in Redis
        for (String seatNo : request.getSeatNumbers()) {
            String key = "seat:" + request.getRouteId() + ":" + seatNo;
            System.out.println(key +"booking Service");
            if (!Boolean.TRUE.equals(redisTemplate.hasKey(key))) {
                throw new RuntimeException("Seat lock expired: " + seatNo);
            }
        }

        // 2. Create booking
        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setRouteId(request.getRouteId());
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setTotalAmount(BigDecimal.ZERO); // calculate later

        bookingRepository.save(booking);

        // 3. Mark seats as BOOKED
        for (String seatNo : request.getSeatNumbers()) {

        	       System.out.println("Mark seats as BOOKED " + seatNo );
            RouteSeat routeSeat =
                    routeSeatRepository
                            .findByRouteIdAndSeatSeatNumber(
                                    request.getRouteId(), seatNo)
                            .orElseThrow();

            if (routeSeat.isBooked()) {
                throw new RuntimeException("Seat already booked");
            }

            routeSeat.setBooked(true);
            routeSeatRepository.save(routeSeat);

            BookingSeat bookingSeat = new BookingSeat();
            bookingSeat.setBooking(booking);
            bookingSeat.setSeat(routeSeat.getSeat());

            bookingSeatRepository.save(bookingSeat);

            // 4. Remove Redis lock
            redisTemplate.delete(
                    "seat:" + request.getRouteId() + ":" + seatNo);
        }

        return booking;
    }
}
