package com.edigest.busbooking.search.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edigest.busbooking.search.entity.Route;

public interface RouteRepository extends JpaRepository<Route, Long> {
	
	List<Route> findBySourceIgnoreCaseAndDestinationIgnoreCaseAndDepartureTimeBetween(
            String source,
            String destination,
            LocalDateTime start,
            LocalDateTime end
    );
	 


}
