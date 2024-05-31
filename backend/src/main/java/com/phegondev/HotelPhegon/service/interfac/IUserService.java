package com.phegondev.HotelPhegon.service.interfac;

import com.phegondev.HotelPhegon.dto.LoginRequest;
import com.phegondev.HotelPhegon.dto.Response;
import com.phegondev.HotelPhegon.entity.User;

public interface IUserService {

    Response register(User user);
    Response login(LoginRequest loginRequest);
    Response getAllUsers();
    Response getUSerBookingHistory(String userId);
    Response deleteUser(String userId);
    Response getUserById(String userId);
    Response getMyInfo(String email);
}
