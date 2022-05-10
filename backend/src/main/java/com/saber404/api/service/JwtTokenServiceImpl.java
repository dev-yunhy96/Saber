package com.saber404.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.saber404.api.config.JwtTokenProvider;
import com.saber404.api.entity.User;
import com.saber404.api.repository.UserRepository;


@Service("jwtTokenService")
@RequiredArgsConstructor
public class JwtTokenServiceImpl implements JwtTokenService{

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    @Override
    public User convertTokenToUser(String accessToken) {
        String token = accessToken.split(" ")[1];
        String loginId = jwtTokenProvider.getUserPk(token);
        User user = userRepository.findById(loginId).get();

        return user;
    }
}
