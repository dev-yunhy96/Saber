package com.saber404.api.service;

import com.saber404.api.dto.request.CommunityRegisterRequestDto;
import com.saber404.api.entity.Community;
import com.saber404.api.entity.User;
import com.saber404.api.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service("communityService")
@RequiredArgsConstructor
public class CommnunityServiceImpl implements CommunityService{

    private final CommunityRepository communityRepository;

    private final JwtTokenService jwtTokenService;
    @Transactional
    @Override
    public Community registerCommunity(String accessToken, CommunityRegisterRequestDto communityRegisterRequestDto) {
        User user = jwtTokenService.convertTokenToUser(accessToken);
        LocalDateTime currentDateTime = LocalDateTime.now();

        Community community = Community.builder()
                .title(communityRegisterRequestDto.getTitle())
                .content(communityRegisterRequestDto.getContent())
                .regTime(currentDateTime)
                .hit(0)
                .user(user)
                .build();

        return communityRepository.save(community);
    }
}
