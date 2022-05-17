package com.saber404.api.service;

import com.saber404.api.entity.MatchPlayer;
import com.saber404.api.repository.MatchPlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchPlayerService {

    private final MatchPlayerRepository matchPlayerRepository;

    @Transactional
    public boolean overlap (String matchId, String playerId) {
        if(matchPlayerRepository.check(matchId, playerId) > 0) {
            return true;
        }else {
            return false;
        }
    }

    @Transactional
    public void save (MatchPlayer matchPlayer) {
        matchPlayerRepository.save(matchPlayer);
    }

    @Transactional
    public List<MatchPlayer> findByPlayerId (String playerId) {
        return matchPlayerRepository.findByPlayerId(playerId);
    }

    @Transactional
    public List<MatchPlayer> findByMatchId (String matchId) {
        return matchPlayerRepository.findByMatchId(matchId);
    }

}
