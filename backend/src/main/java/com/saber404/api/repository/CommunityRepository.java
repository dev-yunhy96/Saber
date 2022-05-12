package com.saber404.api.repository;

import com.saber404.api.entity.Community;
import com.saber404.api.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, String> {

    Page<Community> findByDelYn(boolean delYn, Pageable pageable);

    List<Community> findByDelYnOrderByRegTimeDesc(boolean delYn);

    List<Community> findByUser(User user);
}
