package com.saber404.api.service;

import com.saber404.api.dto.request.CommunityModifyRequestDto;
import com.saber404.api.dto.request.CommunityRegisterRequestDto;
import com.saber404.api.dto.response.CommunityGetListResponseDto;
import com.saber404.api.dto.response.CommunityGetResponseDto;
import com.saber404.api.entity.Community;
import com.saber404.api.entity.User;
import com.saber404.api.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

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

    @Override
    public CommunityGetListResponseDto getCommunityList() {//리스트 제목만 필요하니까 콘텐트는 넣지 않았음
        List<CommunityGetResponseDto> communityGetResponselist = new ArrayList<CommunityGetResponseDto>();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        List<Community> communiylist = communityRepository.findByDelYnOrderByRegTimeDesc(false);
        communiylist.forEach(community -> {
            CommunityGetResponseDto communityGetResponseDto = CommunityGetResponseDto.builder()
                    .communityId(community.getId())
                    .userId(community.getUser().getId())
                    .userNickname(community.getUser().getNickname())
                    .title(community.getTitle())
                    .hit(community.getHit())
                    .regTime(community.getRegTime().format(dateTimeFormatter))
                    .content(community.getContent())
                    .build();

            communityGetResponselist.add(communityGetResponseDto);
        });

        CommunityGetListResponseDto communityGetListResponseDto = CommunityGetListResponseDto.builder()
                .communityGetResponselist(communityGetResponselist)
                .build();

        return communityGetListResponseDto;
    }

    @Override
    public CommunityGetResponseDto getCommunity(String communityId) {

        Community community = communityRepository.findById(communityId).orElse(null);

        if(community == null)
            return null;

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        community.plusCommunityHit();

        CommunityGetResponseDto communityGetResponseDto = CommunityGetResponseDto.builder()
                .communityId(community.getId())
                .title(community.getTitle())
                .content(community.getContent())
                .hit(community.getHit())
                .regTime(community.getRegTime().format(dateTimeFormatter))
                .userId(community.getUser().getId())
                .userNickname(community.getUser().getNickname())
                .build();

        communityRepository.save(community);

        return communityGetResponseDto;

    }

    @Transactional
    @Override
    public Community modifyCommunity(CommunityModifyRequestDto communityUpdateRequestDto) {
        Community community = communityRepository.findById(communityUpdateRequestDto.getCommunityId()).orElse(null);

        if(community == null)
            return null;

        community.modifyCommunity(
                communityUpdateRequestDto.getTitle(),
                communityUpdateRequestDto.getContent());

        return communityRepository.save(community);
    }

    @Transactional
    @Override
    public Community deleteCommunity(String communityId) {
        Community community = communityRepository.findById(communityId).orElse(null);

        if(community == null)
            return null;

        community.deleteCommunity();

        return communityRepository.save(community);
    }

}
