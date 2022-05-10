package com.saber404.api.service;

import com.saber404.api.dto.request.CommunityRegisterRequestDto;
import com.saber404.api.entity.Community;

public interface CommunityService {
    Community registerCommunity(String accessToken, CommunityRegisterRequestDto communityRegisterRequestDto);
}
