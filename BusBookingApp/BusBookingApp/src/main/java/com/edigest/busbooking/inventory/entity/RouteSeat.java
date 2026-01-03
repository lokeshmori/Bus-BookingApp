package com.edigest.busbooking.inventory.entity;

import com.edigest.busbooking.search.entity.Route;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "route_seats")
@Getter @Setter
public class RouteSeat {
	

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Route route;

    @ManyToOne
    private Seat seat;

    private boolean isBooked;

}
