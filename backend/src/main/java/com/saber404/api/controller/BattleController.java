package com.saber404.api.controller;

import com.saber404.api.dto.request.BattleSendDto;
import com.saber404.api.dto.request.BattleIdDto;
import com.saber404.api.dto.response.BattleRecordDto;
import com.saber404.api.entity.Battle;
import com.saber404.api.entity.Match;
import com.saber404.api.entity.MatchPlayer;
import com.saber404.api.entity.Player;
import com.saber404.api.service.BattleService;
import com.saber404.api.service.MatchPlayerService;
import com.saber404.api.service.PlayerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/battle")
public class BattleController {

    private final BattleService battleService;

    private final PlayerService playerService;

    private String[] headers = {"Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNDAzNDU1MDA2IiwiYXV0aF9pZCI6IjQiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExMzkzIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjIwMDAwOjEwIiwibmJmIjoxNjUyOTIzNzgxLCJleHAiOjE3MTU5OTU3ODEsImlhdCI6MTY1MjkyMzc4MX0.xK8KzSm6X6PzqDIx-QTvX-DbHEHIuJrM2KaX8Ev68W4"};

    private HttpClient client = HttpClient.newBuilder().build();

    private JSONParser jsonParser = new JSONParser();


    @PostMapping("/send")
    public ResponseEntity<String> sendBettle (@RequestBody BattleSendDto battleSendDto) throws Exception{
        if(battleService.sendBattle(battleSendDto)) {
            return new ResponseEntity<String>("200", HttpStatus.OK);
        }else {
            return new ResponseEntity<String>("500", HttpStatus.OK);
        }
    }

    @GetMapping("/sendList/{sender_id}")
    public ResponseEntity<List<Battle>> getSendList (@PathVariable("sender_id") String senderId) {
        Optional<Player> player = playerService.findPlayer(senderId);
        return new ResponseEntity<List<Battle>>(battleService.getSendList(player.get().getAccountNo()), HttpStatus.OK);
    }

    @GetMapping("/receiveList/{receiver_id}")
    public ResponseEntity<List<Battle>> getReceiveList (@PathVariable("receiver_id") String receiverId) {
        Optional<Player> player = playerService.findPlayer(receiverId);
        return new ResponseEntity<List<Battle>>(battleService.getReceiveList(player.get().getAccountNo()), HttpStatus.OK);
    }

    @GetMapping("/startList/{player_id}")
    public ResponseEntity<List<Battle>> getStartList (@PathVariable("player_id") String playerId) {
        Optional<Player> player = playerService.findPlayer(playerId);
        return new ResponseEntity<List<Battle>>(battleService.getStartList(player.get().getAccountNo()), HttpStatus.OK);
    }

    @GetMapping("/endList/{player_id}")
    public ResponseEntity<List<Battle>> getEndList (@PathVariable("player_id") String playerId) {
        Optional<Player> player = playerService.findPlayer(playerId);
        return new ResponseEntity<List<Battle>>(battleService.getEndList(player.get().getAccountNo()), HttpStatus.OK);
    }

    @GetMapping("/navCount/{player_id}")
    public ResponseEntity<Integer> navCount (@PathVariable("player_id") String playerId) {
        int result = battleService.receiveCount(playerId) + battleService.startCount(playerId);
        return new ResponseEntity<Integer>(result, HttpStatus.OK);
    }

    @GetMapping("/battleRecord/{player_id}")
    public ResponseEntity<BattleRecordDto> battleRecord (@PathVariable("player_id") String playerId) {
        BattleRecordDto brDto = new BattleRecordDto();
        int win = battleService.winCount(playerId);
        int total = battleService.totalCount(playerId);
        brDto.setWin(win);
        brDto.setTotal(total);
        brDto.setLose(total - win);
        return new ResponseEntity<BattleRecordDto>(brDto, HttpStatus.OK);
    }

    @PutMapping("/start")
    public ResponseEntity<String> startBattle (@RequestBody BattleIdDto battleIdDto) {
        System.out.println(battleIdDto);    	
        if(battleService.startBattle(battleIdDto.getBattleId())) {
            return new ResponseEntity<String>("200", HttpStatus.OK);
        }else {
            return new ResponseEntity<String>("500", HttpStatus.OK);
        }
    }

    @PutMapping("/cancel")
    public ResponseEntity<String> cancelBattle (@RequestBody BattleIdDto battleIdDto) {
        if(battleService.cancelBattle(battleIdDto.getBattleId())) {
            return new ResponseEntity<String>("200", HttpStatus.OK);
        }else {
            return new ResponseEntity<String>("500", HttpStatus.OK);
        }
    }

    @PutMapping("/check")
    public ResponseEntity<String> checkWinner (@RequestBody BattleIdDto battleIdDto) throws Exception {
        Battle battle = battleService.findByBattleId(battleIdDto.getBattleId());
        Player receiver = battle.getReceiver();
        Player sender = battle.getSender();
        String[] headers = {"Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNDAzNDU1MDA2IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExMzkzIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY1MTAzOTM3NiwiZXhwIjoxNjY2NTkxMzc2LCJpYXQiOjE2NTEwMzkzNzZ9.2NOzZOpckBq_81Ikj3Jk8Wat-WJtYzyN7j_bqHlBYVs"};
        HttpClient client = HttpClient.newBuilder().build();
        JSONParser jsonParser = new JSONParser();
        String address2 = "https://api.nexon.co.kr/kart/v1.0/users/" + receiver.getAccountNo() + "/matches?start_date=&end_date=&offset=&limit=3&match_types=";
        String result2 = client.sendAsync(
                HttpRequest.newBuilder(new URI(address2)).GET().headers(headers).build(), HttpResponse.BodyHandlers.ofString()
        ).thenApply(HttpResponse::body).get();
        Object obj2 = jsonParser.parse(result2);
        JSONObject jsonObj2 = (JSONObject) obj2;
        JSONArray jsonAry1 = (JSONArray) jsonObj2.get("matches");

        for (int i = 0; i < jsonAry1.size(); i++) {
            JSONObject jsonObj3 = (JSONObject) jsonAry1.get(i);
            JSONArray jsonAry2 = (JSONArray) jsonObj3.get("matches");
            for (int j = 0; j < jsonAry2.size(); j++) {
                JSONObject jsonObj4 = (JSONObject) jsonAry2.get(j);
                String matchId = jsonObj4.get("matchId").toString();
                String address1 = "https://api.nexon.co.kr/kart/v1.0/matches/" + matchId;
                String result1 = client.sendAsync(
                        HttpRequest.newBuilder(new URI(address1)).GET().headers(headers).build(), HttpResponse.BodyHandlers.ofString()
                ).thenApply(HttpResponse::body).get();
                Object obj1 = jsonParser.parse(result1);
                JSONObject jsonObj = (JSONObject) obj1;
                if(jsonObj.containsKey("teams")){
                    continue;
                }

                int count = 2;
                JSONArray jsonAry = (JSONArray) jsonObj.get("players");
                if(jsonAry.size() != 2) {
                    continue;
                }
                for(int k=0; k<jsonAry.size(); k++) {
                    JSONObject jsonObj0 = (JSONObject) jsonAry.get(k);
                    if (jsonObj0.get("accountNo").toString().equals(receiver.getAccountNo())) {
                        count--;
                    }
                    if (jsonObj0.get("accountNo").toString().equals(sender.getAccountNo())) {
                        count--;
                    }
                    if (jsonObj0.get("matchWin").toString().equals("1") && (jsonObj0.get("accountNo").toString().equals(receiver.getAccountNo()) || jsonObj0.get("accountNo").toString().equals(sender.getAccountNo()))) {
                        battle.setWinner(playerService.findPlayer(jsonObj0.get("characterName").toString()).get());
                        battle.setStatus("3");
                    }
                }
                if(count == 0) {
                    battleService.save(battle);
                    return new ResponseEntity<String>("200", HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity<String>("500", HttpStatus.OK);

    }

}
