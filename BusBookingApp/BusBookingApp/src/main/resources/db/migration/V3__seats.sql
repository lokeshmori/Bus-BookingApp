CREATE TABLE seats (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bus_id BIGINT,
    seat_number VARCHAR(10),
    seat_type VARCHAR(20),
    FOREIGN KEY (bus_id) REFERENCES buses(id)
);

CREATE TABLE route_seats (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    route_id BIGINT,
    seat_id BIGINT,
    is_booked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (route_id) REFERENCES routes(id),
    FOREIGN KEY (seat_id) REFERENCES seats(id)
);
