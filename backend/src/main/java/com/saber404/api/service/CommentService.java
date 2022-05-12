package com.saber404.api.service;

import com.saber404.api.dto.request.CommentModifyRequestDto;
import com.saber404.api.dto.request.CommentRegisterRequestDto;
import com.saber404.api.dto.response.CommentGetListResponseDto;
import com.saber404.api.dto.response.CommentGetResponseDto;
import com.saber404.api.entity.Comment;

public interface CommentService {

    Comment registerComment(String accessToken, CommentRegisterRequestDto commentRegisterRequestDto);

    CommentGetResponseDto getComment(String commentId);

    CommentGetListResponseDto getCommentList(String communityId);

    Comment modifyComment(CommentModifyRequestDto commentModifyRequestDto);

    Comment deleteComment(String commentId);
}
