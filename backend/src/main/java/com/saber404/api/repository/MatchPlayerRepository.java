package com.saber404.api.repository;

import com.saber404.api.entity.Match;
import com.saber404.api.entity.MatchPlayer;
import com.saber404.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatchPlayerRepository extends JpaRepository<MatchPlayer, String> {

    @Query(value = "select * from match_player m where player_id = :playerId", nativeQuery = true )
    List<MatchPlayer> findByPlayerId(String playerId);

}