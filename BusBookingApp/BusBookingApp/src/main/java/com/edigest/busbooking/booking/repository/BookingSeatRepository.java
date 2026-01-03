package com.edigest.busbooking.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edigest.busbooking.booking.entity.BookingSeat;

public interface BookingSeatRepository extends JpaRepository<BookingSeat, Long> {
	
	 
}
