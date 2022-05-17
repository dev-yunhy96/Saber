package com.saber404.api.service;

import com.saber404.api.entity.Match;
import com.saber404.api.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MatchService {

    private final MatchRepository matchRepository;

    @Transactional
    public void saveMatch(Match match) {
        matchRepository.save(match);
    }

    @Transactional
    public Optional<Match> findMatch(String matchId) {
        Optional<Match> match = matchRepository.findByMatchId(matchId);
        return match;
    }



}
