package com.phegon.PhegonHotelMongo.service.interfac;

import com.phegon.PhegonHotelMongo.dto.LoginRequest;
import com.phegon.PhegonHotelMongo.dto.Response;
import com.phegon.PhegonHotelMongo.entity.User;

public interface IUserService {

    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUSerBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);
}
