package com.edigest.busbooking.inventory.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edigest.busbooking.inventory.entity.RouteSeat;

public interface RouteSeatRepository extends JpaRepository<RouteSeat, Long>  {
     List<RouteSeat> findByRouteId(Long routeId);
    Optional<RouteSeat> findByRouteIdAndSeatSeatNumber(Long routeId, String seatNumber);
}

