package com.edigest.busbooking.booking.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.edigest.busbooking.booking.dto.BookingDraftRequest;
import com.edigest.busbooking.booking.dto.PassengerDto;
import com.edigest.busbooking.booking.entity.Booking;
import com.edigest.busbooking.booking.entity.BookingPassenger;
import com.edigest.busbooking.booking.enums.BookingStatus;
import com.edigest.busbooking.booking.repository.BookingPassengerRepository;
import com.edigest.busbooking.booking.repository.BookingRepository;
import com.edigest.busbooking.inventory.repository.RouteSeatRepository;

import jakarta.transaction.Transactional;

@Service
public class BookingDraftService {

    private final BookingRepository bookingRepository;
    private final BookingPassengerRepository passengerRepository;
    private final RouteSeatRepository routeSeatRepository;
    private final RedisTemplate<String, String> redisTemplate;

    public BookingDraftService(
            BookingRepository bookingRepository,
            BookingPassengerRepository passengerRepository,
            RouteSeatRepository routeSeatRepository,
            RedisTemplate<String, String> redisTemplate) {

        this.bookingRepository = bookingRepository;
        this.passengerRepository = passengerRepository;
        this.routeSeatRepository = routeSeatRepository;
        this.redisTemplate = redisTemplate;
    }

    @Transactional
    public Long createDraft(
            Long userId,
            BookingDraftRequest request) {

        // 1. Validate Redis seat locks
        for (String seatNo : request.getSeats()) {
            String key = "seat:" + request.getTripId() + ":" + seatNo;
                    System.out.println(key +"createDraft "+ redisTemplate.opsForValue().get(key));
            if (Boolean.TRUE.equals(redisTemplate.hasKey(key))) {
                throw new RuntimeException("Seat lock expired: " + seatNo);
            }
        }

        // 2. Create Booking (DRAFT)
        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setRouteId(request.getTripId());
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setTotalAmount(request.getTotalAmount());

        bookingRepository.save(booking);

        // 3. Save passengers
        for (PassengerDto p : request.getPassengers()) {
            BookingPassenger passenger = new BookingPassenger();
            passenger.setName(p.getName());
            passenger.setAge(p.getAge());
            passenger.setGender(p.getGender());
            passenger.setBooking(booking);
            passengerRepository.save(passenger);
        }

        return booking.getId();
    }
}
