package com.saber404.api.repository;

import com.saber404.api.entity.Match;
import com.saber404.api.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<Match, String> {

    Optional<Match> findByMatchId(String matchId);
}
