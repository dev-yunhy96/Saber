package com.saber404.api.controller;

import com.saber404.api.entity.Match;
import com.saber404.api.entity.MatchPlayer;
import com.saber404.api.entity.Player;
import com.saber404.api.repository.PlayerRepository;
import com.saber404.api.service.MatchPlayerService;
import com.saber404.api.service.MatchService;
import com.saber404.api.service.PlayerService;
import com.saber404.api.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/match")
public class MatchController {

    private final MatchService matchService;

    private final PlayerService playerService;

    private final MatchPlayerService matchPlayerService;

    private String[] headers = {"Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNDAzNDU1MDA2IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExMzkzIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY1MTAzOTM3NiwiZXhwIjoxNjY2NTkxMzc2LCJpYXQiOjE2NTEwMzkzNzZ9.2NOzZOpckBq_81Ikj3Jk8Wat-WJtYzyN7j_bqHlBYVs"};

    private HttpClient client = HttpClient.newBuilder().build();

    private JSONParser jsonParser = new JSONParser();

    @GetMapping("/list/{player_id}")
    public ResponseEntity<List<MatchPlayer>> searchPlayer(@PathVariable("player_id") String playerId) throws Exception {

        Optional<Player> findPlayer = playerService.findPlayer(playerId);
        Player player = new Player();
        String accessId;
        if(findPlayer.isEmpty()) {
            String address = "https://api.nexon.co.kr/kart/v1.0/users/nickname/" + playerId;
            String result = client.sendAsync(
                    HttpRequest.newBuilder(new URI(address)).GET().headers(headers).build(), HttpResponse.BodyHandlers.ofString()
            ).thenApply(HttpResponse::body).get();
            Object obj = jsonParser.parse(result);
            JSONObject jsonObj = (JSONObject) obj;
            accessId = String.valueOf(jsonObj.get("accessId"));
            player.setCharacterName(playerId);
            player.setAccountNo(accessId);
            player.setLastUpdateTime(Instant.now().toString().substring(0, 19));
            playerService.savePlayer(player);
        }else {
            player = findPlayer.get();
            player.setLastUpdateTime(Instant.now().toString().substring(0, 19));
            accessId = player.getAccountNo();
        }

        String address2 = "https://api.nexon.co.kr/kart/v1.0/users/" + accessId +"/matches?start_date=&end_date=&offset=&limit=200&match_types=";
        String result2 = client.sendAsync(
                HttpRequest.newBuilder(new URI(address2)).GET().headers(headers).build(), HttpResponse.BodyHandlers.ofString()
        ).thenApply(HttpResponse::body).get();
        Object obj2 = jsonParser.parse(result2);
        JSONObject jsonObj2 = (JSONObject) obj2;
        JSONArray jsonAry1 = (JSONArray) jsonObj2.get("matches");

        for(int i = 0; i<jsonAry1.size(); i++) {
            JSONObject jsonObj3 = (JSONObject) jsonAry1.get(i);
            JSONArray jsonAry2 = (JSONArray) jsonObj3.get("matches");
            for (int j = 0; j < jsonAry2.size(); j++) {
                JSONObject jsonObj4 = (JSONObject) jsonAry2.get(j);
                if (matchPlayerService.overlap(jsonObj4.get("matchId").toString(), jsonObj4.get("accountNo").toString())) {
                    continue;
                }
                Match match = new Match();
                match.setMatchId(jsonObj4.get("matchId").toString());
                match.setMatchType(jsonObj4.get("matchType").toString());
                match.setStartTime(jsonObj4.get("startTime").toString());
                match.setEndTime(jsonObj4.get("endTime").toString());
                match.setTrackId(jsonObj4.get("trackId").toString());
                match.setPlayerCount((Long) jsonObj4.get("playerCount"));
                matchService.saveMatch(match);
                MatchPlayer matchPlayer = new MatchPlayer();
                matchPlayer.setMatch(match);
                matchPlayer.setPlayer(player);
                matchPlayer.setCharacterType(jsonObj4.get("character").toString());
                JSONObject jsonObj5 = (JSONObject) jsonObj4.get("player");
                matchPlayer.setMatchRank(jsonObj5.get("matchRank").toString());
                matchPlayer.setMatchRetired(jsonObj5.get("matchRetired").toString());
                matchPlayer.setMatchWin(jsonObj5.get("matchWin").toString());
                matchPlayer.setMatchTime(jsonObj5.get("matchTime").toString());
                matchPlayer.setKart(jsonObj5.get("kart").toString());
                matchPlayer.setTeamId(jsonObj4.get("teamId").toString());
                matchPlayerService.save(matchPlayer);
            }
        }

        return new ResponseEntity<List<MatchPlayer>>(matchPlayerService.findByPlayerId(accessId), HttpStatus.OK);
    }

    @GetMapping("/detail/{match_id}")
    public ResponseEntity<List<MatchPlayer>> matchDetail(@PathVariable("match_id") String matchId) throws Exception {

        String address1 = "https://api.nexon.co.kr/kart/v1.0/matches/" + matchId;
        String result1 = client.sendAsync(
                HttpRequest.newBuilder(new URI(address1)).GET().headers(headers).build(), HttpResponse.BodyHandlers.ofString()
        ).thenApply(HttpResponse::body).get();
        Object obj1 = jsonParser.parse(result1);
        JSONObject jsonObj = (JSONObject) obj1;
        JSONArray jsonAry;

        Optional<Match> findMatch = matchService.findMatch(matchId);
        Match match = new Match();
        if(findMatch.isEmpty()) {
            match.setMatchId(jsonObj.get("matchId").toString());
            match.setMatchType(jsonObj.get("matchType").toString());
            match.setStartTime(jsonObj.get("startTime").toString());
            match.setEndTime(jsonObj.get("endTime").toString());
            match.setTrackId(jsonObj.get("trackId").toString());
            matchService.saveMatch(match);
        }else {
            match = findMatch.get();
        }
        if(jsonObj.containsKey("teams")){
            jsonAry = (JSONArray) jsonObj.get("teams");
            for(int i=0; i<jsonAry.size(); i++) {
                JSONObject jsonObj1 = (JSONObject) jsonAry.get(i);
                JSONArray jsonAry1 = (JSONArray) jsonObj1.get("players");
                String teamId = jsonObj1.get("teamId").toString();
                for(int j=0; j<jsonAry1.size(); j++) {
                    JSONObject jsonObj2 = (JSONObject) jsonAry1.get(j);
                    MatchPlayer matchPlayer = new MatchPlayer();
                    if (matchPlayerService.overlap(matchId, jsonObj2.get("accountNo").toString())) {
                        continue;
                    }
                    Optional<Player> findPlayer = playerService.findPlayer(jsonObj2.get("characterName").toString());
                    Player player = new Player();
                    if(findPlayer.isEmpty()){
                        player.setAccountNo(jsonObj2.get("accountNo").toString());
                        player.setCharacterName(jsonObj2.get("characterName").toString());
                        player.setLastUpdateTime(Instant.now().toString().substring(0, 19));
                        playerService.savePlayer(player);
                    }else {
                        player = findPlayer.get();
                        player.setLastUpdateTime(Instant.now().toString().substring(0, 19));
                    }
                    matchPlayer.setMatch(match);
                    matchPlayer.setPlayer(player);
                    matchPlayer.setCharacterType(jsonObj2.get("character").toString());
                    matchPlayer.setMatchRank(jsonObj2.get("matchRank").toString());
                    matchPlayer.setMatchRetired(jsonObj2.get("matchRetired").toString());
                    matchPlayer.setMatchWin(jsonObj2.get("matchWin").toString());
                    matchPlayer.setMatchTime(jsonObj2.get("matchTime").toString());
                    matchPlayer.setKart(jsonObj2.get("kart").toString());
                    matchPlayer.setTeamId(teamId);
                    matchPlayerService.save(matchPlayer);
                }
            }
        }else {
            jsonAry = (JSONArray) jsonObj.get("players");
            match.setPlayerCount(Long.valueOf(jsonAry.size()));
            for(int i=0; i<jsonAry.size(); i++) {
                JSONObject jsonObj2 = (JSONObject) jsonAry.get(i);
                MatchPlayer matchPlayer = new MatchPlayer();
                if (matchPlayerService.overlap(matchId, jsonObj2.get("accountNo").toString())) {
                    continue;
                }
                Optional<Player> findPlayer = playerService.findPlayer(jsonObj2.get("characterName").toString());
                Player player = new Player();
                if(findPlayer.isEmpty()){
                    player.setAccountNo(jsonObj2.get("accountNo").toString());
                    player.setCharacterName(jsonObj2.get("characterName").toString());
                    player.setLastUpdateTime(Instant.now().toString().substring(0, 19));
                    playerService.savePlayer(player);
                }else {
                    player = findPlayer.get();
                    player.setLastUpdateTime(Instant.now().toString().substring(0, 19));
                }
                matchPlayer.setMatch(match);
                matchPlayer.setPlayer(player);
                matchPlayer.setCharacterType(jsonObj2.get("character").toString());
                matchPlayer.setMatchRank(jsonObj2.get("matchRank").toString());
                matchPlayer.setMatchRetired(jsonObj2.get("matchRetired").toString());
                matchPlayer.setMatchWin(jsonObj2.get("matchWin").toString());
                matchPlayer.setMatchTime(jsonObj2.get("matchTime").toString());
                matchPlayer.setKart(jsonObj2.get("kart").toString());
                matchPlayerService.save(matchPlayer);
            }
        }

        return new ResponseEntity<List<MatchPlayer>>(matchPlayerService.findByMatchId(matchId), HttpStatus.OK);
    }

    @GetMapping("/checkNick/{nickname}")
    public ResponseEntity<String> checkNick(@PathVariable("nickname") String nickname) throws Exception {
        Optional<Player> findPlayer = playerService.findPlayer(nickname);
        if(findPlayer.isEmpty()) {
            String address = "https://api.nexon.co.kr/kart/v1.0/users/nickname/" + nickname;
            String result = client.sendAsync(
                    HttpRequest.newBuilder(new URI(address)).GET().headers(headers).build(), HttpResponse.BodyHandlers.ofString()
            ).thenApply(HttpResponse::body).get();
            Object obj = jsonParser.parse(result);
            JSONObject jsonObj = (JSONObject) obj;
            if(jsonObj.containsKey("message")) {
                return new ResponseEntity<String>("404", HttpStatus.OK);
            }
            return new ResponseEntity<String>("200", HttpStatus.OK);
        }else {
            return new ResponseEntity<String>("500", HttpStatus.OK);
        }
    }
}
