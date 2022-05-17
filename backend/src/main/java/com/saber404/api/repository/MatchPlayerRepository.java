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

    @Query(value = "select * from match_player m left join matches ma on m.matches_id = ma.match_id where player_id = :playerId order by end_time desc", nativeQuery = true )
    List<MatchPlayer> findByPlayerId(String playerId);

    @Query(value = "select * from match_player m left join matches ma on m.matches_id = ma.match_id where match_id = :matchId order by end_time desc", nativeQuery = true )
    List<MatchPlayer> findByMatchId(String matchId);

    @Query(value = "select count(*) from match_player m where matches_id =:matchId and player_id = :playerId", nativeQuery = true )
    int check(String matchId, String playerId);

}
