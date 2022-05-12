package com.saber404.api.service;

import com.saber404.api.dto.request.CommunityModifyRequestDto;
import com.saber404.api.dto.request.CommunityRegisterRequestDto;
import com.saber404.api.dto.response.CommunityGetListResponseDto;
import com.saber404.api.dto.response.CommunityGetResponseDto;
import com.saber404.api.entity.Community;

public interface CommunityService {
    Community registerCommunity(String accessToken, CommunityRegisterRequestDto communityRegisterRequestDto);
    CommunityGetListResponseDto getCommunityList();
    CommunityGetResponseDto getCommunity(String communityId);
    Community modifyCommunity(CommunityModifyRequestDto communityUpdateRequestDto);
    Community deleteCommunity(String communityId);
}
