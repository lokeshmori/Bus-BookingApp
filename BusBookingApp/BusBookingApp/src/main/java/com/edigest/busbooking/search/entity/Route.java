package com.edigest.busbooking.search.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "routes")
public class Route {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String source;
	    private String destination;

	    private LocalDateTime departureTime;
	    private LocalDateTime arrivalTime;

	    private BigDecimal baseFare;
	    
	    @ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(name = "bus_id")
	    private Bus bus;

}
