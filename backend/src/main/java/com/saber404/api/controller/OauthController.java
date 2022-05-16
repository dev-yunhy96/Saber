package com.saber404.api.controller;

import com.saber404.api.dto.request.SignUpReq;
import com.saber404.api.service.OAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/oauth")
public class OauthController {

    private final OAuthService oAuthService;


    @GetMapping("/naver")
    public ResponseEntity<Map<String, String>> naver(@RequestParam String accessToken) throws Exception {
        log.info("Map : " + accessToken);
        Map<String, String> map = new HashMap<>();

        try {
//           String accessToken = oAuthService.getNaverAccessToken(code);
            SignUpReq signUpReq = oAuthService.createNaverUser(accessToken);
            System.out.println("Controller" + signUpReq);
            String token = oAuthService.getToken(signUpReq);
            map.put("token", token);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("msg","이메일,닉네임을 반드시 동의해주셔야 됩니다.");
            return new ResponseEntity<Map<String, String>>(map, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
    }
}
