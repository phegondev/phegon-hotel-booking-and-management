package com.phegon.PhegonHotelMongo.service.interfac;


import com.phegon.PhegonHotelMongo.dto.Response;
import com.phegon.PhegonHotelMongo.entity.Booking;

public interface IBookingService {

    Response saveBooking(String rooId, String userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(String bookingId);
}
