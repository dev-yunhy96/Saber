package com.saber404.api.repository;

import com.saber404.api.entity.Comment;
import com.saber404.api.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, String> {
    List<Comment> findByCommunityAndDelYnOrderByRegTime(Community community, boolean delYn);
}
