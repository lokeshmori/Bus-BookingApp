package com.edigest.busbooking.booking.entity;

import com.edigest.busbooking.booking.enums.Gender;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
	@Table(name = "booking_passengers")
	@Getter @Setter
	public class BookingPassenger {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;
	    private int age;

	    @Enumerated(EnumType.STRING)
	    private Gender gender;

	    @ManyToOne
	    @JoinColumn(name = "booking_id")
	    private Booking booking;
	}


