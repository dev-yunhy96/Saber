package com.saber404.api.controller;

import com.saber404.api.dto.request.CommunityRegisterRequestDto;
import com.saber404.api.dto.response.BaseResponseDto;
import com.saber404.api.service.CommunityService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "커뮤니티 API", tags = { "Community" })
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/community")
public class CommunityController {
    private final CommunityService communityService;

    @PostMapping
    @ApiOperation(value = "커뮤니티 등록하기", notes="<strong>회원이 작성한 커뮤니티를 등록한다.</strong><br/>")
    @ApiResponses({
            @ApiResponse(code=201, message="커뮤니티가 정상적으로 등록되었습니다."),
            @ApiResponse(code=400, message="커뮤니티 등록을 실패했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDto> regist(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @RequestBody @ApiParam(value = "등록할 커뮤니티", required = true) CommunityRegisterRequestDto communityRegisterRequestDto){
        if(communityService.registerCommunity(accessToken, communityRegisterRequestDto) != null)
            return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseDto.of(HttpStatus.CREATED.value(), "Success"));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(BaseResponseDto.of(HttpStatus.BAD_REQUEST.value(), "Fail"));
    }
}
