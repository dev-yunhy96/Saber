//package com.saber404.api.controller;
//
//import com.saber404.api.dto.request.BattleSendDto;
//import com.saber404.api.entity.Battle;
//import com.saber404.api.service.BattleService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@Slf4j
//@RequiredArgsConstructor
//@RestController
//@CrossOrigin("*")
//@RequestMapping("/api/v1/battle")
//public class BattleController {
//
//    private final BattleService battleService;
//
//    @PostMapping("/send")
//    public ResponseEntity<String> sendBettle (@RequestBody BattleSendDto battleSendDto) {
//        if(battleService.sendBattle(battleSendDto)) {
//            return new ResponseEntity<String>("200", HttpStatus.OK);
//        }else {
//            return new ResponseEntity<String>("500", HttpStatus.OK);
//        }
//    }
//
//    @GetMapping("/sendList/{sender_id}")
//    public ResponseEntity<List<Battle>> getSendList (@PathVariable("sender_id") String senderId) {
//        return new ResponseEntity<List<Battle>>(battleService.getSendList(senderId), HttpStatus.OK);
//    }
//}
