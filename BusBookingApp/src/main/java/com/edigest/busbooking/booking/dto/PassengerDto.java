package com.edigest.busbooking.booking.dto;

import com.edigest.busbooking.booking.enums.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PassengerDto {
    private String name;
    private int age;
    private Gender gender;
}

