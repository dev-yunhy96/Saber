package com.saber404.api.service;

import com.saber404.api.entity.User;

public interface JwtTokenService {

    User convertTokenToUser(String accessToken);
}
