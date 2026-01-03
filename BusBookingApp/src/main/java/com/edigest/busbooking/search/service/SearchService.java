package com.edigest.busbooking.search.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.edigest.busbooking.search.dto.SearchResponse;
import com.edigest.busbooking.search.entity.Route;
import com.edigest.busbooking.search.repository.RouteRepository;

@Service
public class SearchService {
	

    private final RouteRepository routeRepository;

    public SearchService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public List<SearchResponse> search(
            String source,
            String destination,
            LocalDate date) {

        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(23, 59, 59);

        List<Route> routes =
                routeRepository.findBySourceIgnoreCaseAndDestinationIgnoreCaseAndDepartureTimeBetween(
                        source, destination, start, end);

        return routes.stream()
                .map(route -> new SearchResponse(
                        route.getId(),
                        route.getBus().getBusType(),
                        route.getBus().getTotalSeats(),
                        route.getDepartureTime(),
                        route.getArrivalTime(),
                        route.getBaseFare()
                ))
                .toList();
    }

}
