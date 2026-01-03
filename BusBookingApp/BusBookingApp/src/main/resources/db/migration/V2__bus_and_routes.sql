CREATE TABLE buses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bus_number VARCHAR(50),
    bus_type VARCHAR(30),
    total_seats INT,
    operator_name VARCHAR(100)
);

CREATE TABLE routes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    source VARCHAR(100),
    destination VARCHAR(100),
    departure_time DATETIME,
    arrival_time DATETIME,
    base_fare DECIMAL(10,2),
    bus_id BIGINT,
    FOREIGN KEY (bus_id) REFERENCES buses(id)
);
