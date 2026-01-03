CREATE TABLE booking_passengers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    booking_id BIGINT,
    name VARCHAR(100),
    age INT,
    gender VARCHAR(10),
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
