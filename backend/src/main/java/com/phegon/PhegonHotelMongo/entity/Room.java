package com.phegon.PhegonHotelMongo.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "rooms")
public class Room {

    @Id
    private String id;

    private String roomType;

    private BigDecimal roomPrice;

    private String roomPhotoUrl;

    private String roomDescription;

    @DBRef
    private List<Booking> bookings = new ArrayList<>();

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", roomType='" + roomType + '\'' +
                ", roomPrice=" + roomPrice +
                ", roomPhotoUrl='" + roomPhotoUrl + '\'' +
                ", description='" + roomDescription + '\'' +
                '}';
    }
}
