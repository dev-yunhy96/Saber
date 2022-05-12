package com.saber404.api.controller;

import com.saber404.api.dto.request.CommunityModifyRequestDto;
import com.saber404.api.dto.request.CommunityRegisterRequestDto;
import com.saber404.api.dto.response.BaseResponseDto;
import com.saber404.api.dto.response.CommunityGetListResponseDto;
import com.saber404.api.dto.response.CommunityGetResponseDto;
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

    @GetMapping("/list")
    @ApiOperation(value = "커뮤니티 전체 목록 불러오기", notes="<strong>커뮤니티 전체 목록을 불러온다.</strong>")
    @ApiResponses({
            @ApiResponse(code=200, message="커뮤니티 목록을 정상적으로 조회하였습니다."),
            @ApiResponse(code=204, message="커뮤니티 목록 조회를 실패했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDto> getCommunityList() {
        CommunityGetListResponseDto communityGetListResponseDto = communityService.getCommunityList();
        if(communityGetListResponseDto != null)
            return ResponseEntity.status(HttpStatus.OK).body(communityGetListResponseDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseDto.of(HttpStatus.NO_CONTENT.value(), "Fail"));
    }

    @GetMapping("/{communityId}")
    @ApiOperation(value = "커뮤니티 불러오기", notes="<strong>communityId에 해당하는 커뮤니티를 불러온다.</strong>")
    @ApiResponses({
            @ApiResponse(code=200, message="커뮤니티을 정상적으로 조회하였습니다."),
            @ApiResponse(code=204, message="커뮤니티 조회를 실패했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDto> getCommunity(
            @PathVariable("communityId") @RequestBody @ApiParam(value = "조회할 커뮤니티 ID", required = true) String communityId){
        CommunityGetResponseDto communityGetResponseDto = communityService.getCommunity(communityId);
        if(communityGetResponseDto != null)
            return ResponseEntity.status(HttpStatus.OK).body(communityGetResponseDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseDto.of(HttpStatus.NO_CONTENT.value(), "Fail"));
    }

    @PutMapping
    @ApiOperation(value = "커뮤니티 수정하기", notes="<strong>작성한 커뮤니티을 수정한다.</strong>")
    @ApiResponses({
            @ApiResponse(code=201, message="커뮤니티이 정상적으로 수정되었습니다."),
            @ApiResponse(code=204, message="커뮤니티 수정을 실패했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDto> modify(
            @RequestBody @ApiParam(value = "등록할 커뮤니티", required = true) CommunityModifyRequestDto CommunityUpdateRequestDto){
        if(communityService.modifyCommunity(CommunityUpdateRequestDto) != null)
            return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseDto.of(HttpStatus.CREATED.value(), "Success"));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseDto.of(HttpStatus.NO_CONTENT.value(), "Fail"));
    }

    @PutMapping("/delete/{communityId}")
    @ApiOperation(value = "커뮤니티 삭제하기", notes="<strong>작성한 커뮤니티를 삭제한다.</strong>")
    @ApiResponses({
            @ApiResponse(code=202, message="커뮤니티가 정상적으로 삭제되었습니다."),
            @ApiResponse(code=204, message="커뮤니티 삭제를 실패했습니다.")
    })
    public ResponseEntity<? extends BaseResponseDto> delete(
            @PathVariable("communityId") @RequestBody @ApiParam(value = "삭제할 커뮤니티ID ", required = true) String communityId){
        if(communityService.deleteCommunity(communityId) != null)
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(BaseResponseDto.of(HttpStatus.ACCEPTED.value(), "Success"));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseDto.of(HttpStatus.NO_CONTENT.value(), "Fail"));
    }
}
