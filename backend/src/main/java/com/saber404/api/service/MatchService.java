package com.saber404.api.service;

import com.saber404.api.dto.request.LoginReq;
import com.saber404.api.dto.request.UserDTO;
import com.saber404.api.entity.Match;
import com.saber404.api.entity.MatchPlayer;
import com.saber404.api.entity.Player;
import com.saber404.api.entity.User;
import com.saber404.api.repository.MatchPlayerRepository;
import com.saber404.api.repository.MatchRepository;
import com.saber404.api.repository.PlayerRepository;
import com.saber404.api.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Instant;
import java.util.*;

@Slf4j
@Service
public class MatchService {

    @Autowired
    private MatchPlayerRepository matchPlayerRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Transactional
    public List<MatchPlayer> findByPlayerId(String playerId) throws Exception {
        String[] headers = new String[2];
        headers[0] = "Authorization";
        headers[1] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNDAzNDU1MDA2IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExMzkzIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY1MTAzOTM3NiwiZXhwIjoxNjY2NTkxMzc2LCJpYXQiOjE2NTEwMzkzNzZ9.2NOzZOpckBq_81Ikj3Jk8Wat-WJtYzyN7j_bqHlBYVs";
        HttpClient client = HttpClient.newBuilder().build();
        JSONParser jsonParser = new JSONParser();
        Optional<Player> findPlayer = playerRepository.findByCharacterName(playerId);

        String accessId;
        String address2;
        Player player = new Player();
        if(findPlayer.isEmpty()) {
            String address1 = "https://api.nexon.co.kr/kart/v1.0/users/nickname/" + playerId;
            String result1 = client.sendAsync(
                    HttpRequest.newBuilder(new URI(address1)).GET().headers(headers).build(), HttpResponse.BodyHandlers.ofString()
            ).thenApply(HttpResponse::body).get();
            Object obj1 = jsonParser.parse(result1);
            JSONObject jsonObj1 = (JSONObject) obj1;
            accessId = String.valueOf(jsonObj1.get("accessId"));
            address2 = "https://api.nexon.co.kr/kart/v1.0/users/" + accessId +"/matches?start_date=&end_date=&offset=&limit=200&match_types=";
        }else {
            accessId = findPlayer.get().getAccountNo();
            address2 = "https://api.nexon.co.kr/kart/v1.0/users/" + accessId +"/matches?start_date=" + findPlayer.get().getLastUpdateTime() + "&end_date=&offset=&limit=200&match_types=";
            player = findPlayer.get();
        }

        String result2 = client.sendAsync(
                HttpRequest.newBuilder(new URI(address2)).GET().headers(headers).build(), HttpResponse.BodyHandlers.ofString()
        ).thenApply(HttpResponse::body).get();
        Object obj2 = jsonParser.parse(result2);
        JSONObject jsonObj2 = (JSONObject) obj2;
        JSONArray jsonAry1 = (JSONArray) jsonObj2.get("matches");
        Instant instant = Instant.now();
        player.setLastUpdateTime(instant.toString().substring(0, 19));
        List<MatchPlayer> matchPlayers = new ArrayList<>();
        for(int i = 0; i<jsonAry1.size(); i++) {
            JSONObject jsonObj3 = (JSONObject) jsonAry1.get(i);
            JSONArray jsonAry2 = (JSONArray) jsonObj3.get("matches");
            for(int j = 0; j<jsonAry2.size(); j++) {
                JSONObject jsonObj4 = (JSONObject) jsonAry2.get(j);
                if(matchPlayerRepository.check(jsonObj4.get("matchId").toString(), accessId).size() == 1) {
                    continue;
                }
                Match match = new Match();
                match.setMatchId(jsonObj4.get("matchId").toString());
                match.setMatchType(jsonObj4.get("matchType").toString());
                match.setStartTime(jsonObj4.get("startTime").toString());
                match.setEndTime(jsonObj4.get("endTime").toString());
                match.setTrackId(jsonObj4.get("trackId").toString());
                match.setPlayerCount((Long)jsonObj4.get("playerCount"));
                MatchPlayer matchPlayer = new MatchPlayer();
                matchPlayer.setMatch(match);
                matchPlayer.setPlayer(player);
                matchPlayer.setCharacterType(jsonObj4.get("character").toString());
                JSONObject jsonObj5 = (JSONObject) jsonObj4.get("player");
                matchPlayer.setMatchRank(jsonObj5.get("matchRank").toString());
                matchPlayer.setMatchRetired(jsonObj5.get("matchRetired").toString());
                matchPlayer.setMatchWin(jsonObj5.get("matchWin").toString());
                matchPlayer.setMatchTime(jsonObj5.get("matchTime").toString());
                matchPlayers.add(matchPlayer);
            }
        }
        Collections.sort(matchPlayers, new Comparator<MatchPlayer>() {
            @Override
            public int compare(MatchPlayer o1, MatchPlayer o2) {
                return o1.getMatchTime().compareTo(o2.getMatchTime());
            }
        });

        for(int i=0; i<matchPlayers.size(); i++) {
            matchPlayerRepository.save(matchPlayers.get(i));
        }

        return matchPlayerRepository.findByPlayerId(accessId);
    }

    @Transactional
    public List<MatchPlayer> findByMatchId(String matchId) throws Exception {
        String[] headers = new String[2];
        headers[0] = "Authorization";
        headers[1] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNDAzNDU1MDA2IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExMzkzIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY1MTAzOTM3NiwiZXhwIjoxNjY2NTkxMzc2LCJpYXQiOjE2NTEwMzkzNzZ9.2NOzZOpckBq_81Ikj3Jk8Wat-WJtYzyN7j_bqHlBYVs";
        HttpClient client = HttpClient.newBuilder().build();
        JSONParser jsonParser = new JSONParser();
        Optional<Match> findMatch = matchRepository.findByMatchId(matchId);
        List<MatchPlayer> matchPlayers = new ArrayList<>();
        String address1 = "https://api.nexon.co.kr/kart/v1.0/matches/" + matchId;
        String result1 = client.sendAsync(
                HttpRequest.newBuilder(new URI(address1)).GET().headers(headers).build(), HttpResponse.BodyHandlers.ofString()
        ).thenApply(HttpResponse::body).get();
        Object obj1 = jsonParser.parse(result1);
        JSONObject jsonObj = (JSONObject) obj1;
        JSONArray jsonAry;
        Match match = new Match();
        if(findMatch.isEmpty()) {
            match.setMatchId(jsonObj.get("matchId").toString());
            match.setMatchType(jsonObj.get("matchType").toString());
            match.setStartTime(jsonObj.get("startTime").toString());
            match.setEndTime(jsonObj.get("endTime").toString());
            match.setTrackId(jsonObj.get("trackId").toString());
        }else {
            match = findMatch.get();
        }

        if(jsonObj.containsKey("teams")){
            jsonAry = (JSONArray) jsonObj.get("teams");
            for(int i=0; i<jsonAry.size(); i++) {
                JSONObject jsonObj1 = (JSONObject) jsonAry.get(i);
                JSONArray jsonAry1 = (JSONArray) jsonObj1.get("players");
                for(int j=0; j<jsonAry1.size(); j++) {
                    JSONObject jsonObj2 = (JSONObject) jsonAry1.get(j);
                    MatchPlayer matchPlayer = new MatchPlayer();
                    matchPlayer.setMatch(match);
                    Optional<Player> findPlayer = playerRepository.findByCharacterName(jsonObj2.get("characterName").toString());
                    if(findPlayer.isEmpty()){
                        Player player = new Player();
                        player.setAccountNo(jsonObj2.get("accountNo").toString());
                        player.setCharacterName(jsonObj2.get("characterName").toString());
                        matchPlayer.setPlayer(player);
                    }else {
                        matchPlayer.setPlayer(findPlayer.get());
                    }
                    matchPlayer.setCharacterType(jsonObj2.get("character").toString());
                    matchPlayer.setMatchRank(jsonObj2.get("matchRank").toString());
                    matchPlayer.setMatchRetired(jsonObj2.get("matchRetired").toString());
                    matchPlayer.setMatchWin(jsonObj2.get("matchWin").toString());
                    matchPlayer.setMatchTime(jsonObj2.get("matchTime").toString());
                    matchPlayers.add(matchPlayer);

                }
            }
        }else {
            jsonAry = (JSONArray) jsonObj.get("players");
            match.setPlayerCount(Long.valueOf(jsonAry.size()));
            for(int i=0; i<jsonAry.size(); i++) {
                JSONObject jsonObj2 = (JSONObject) jsonAry.get(i);
                MatchPlayer matchPlayer = new MatchPlayer();
                matchPlayer.setMatch(match);
                Optional<Player> findPlayer = playerRepository.findByCharacterName(jsonObj2.get("accountNo").toString());
                if(findPlayer.isEmpty()){
                    Player player = new Player();
                    player.setAccountNo(jsonObj2.get("accountNo").toString());
                    player.setCharacterName(jsonObj2.get("characterName").toString());
                    matchPlayer.setPlayer(player);
                }else {
                    matchPlayer.setPlayer(findPlayer.get());
                }
                matchPlayer.setCharacterType(jsonObj2.get("character").toString());
                matchPlayer.setMatchRank(jsonObj2.get("matchRank").toString());
                matchPlayer.setMatchRetired(jsonObj2.get("matchRetired").toString());
                matchPlayer.setMatchWin(jsonObj2.get("matchWin").toString());
                matchPlayer.setMatchTime(jsonObj2.get("matchTime").toString());
                matchPlayers.add(matchPlayer);
            }


        }
        Collections.sort(matchPlayers, new Comparator<MatchPlayer>() {
            @Override
            public int compare(MatchPlayer o1, MatchPlayer o2) {
                return o1.getMatchTime().compareTo(o2.getMatchTime());
            }
        });

        for(int i=0; i<matchPlayers.size(); i++) {
            matchPlayerRepository.save(matchPlayers.get(i));
        }

        return matchPlayerRepository.findByMatchId(matchId);
    }



}
