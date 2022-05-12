package com.saber404.api.controller;

import com.saber404.api.entity.MatchPlayer;
import com.saber404.api.service.MatchService;
import com.saber404.api.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/api/match")
public class MatchController {

    private final MatchService matchService;

    @GetMapping("/list/{user_id}")
    public ResponseEntity<List<MatchPlayer>> test(@PathVariable("user_id") String userId) throws Exception {

        return new ResponseEntity<List<MatchPlayer>>(matchService.searchMatch(userId), HttpStatus.OK);
    }}
