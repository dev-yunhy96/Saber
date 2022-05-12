package com.saber404.api.controller;

import com.saber404.api.dto.request.SignUpReq;
import com.saber404.api.dto.request.UserDTO;
import com.saber404.api.dto.response.MessageRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import javax.validation.Valid;
import java.io.IOException;
import java.util.StringTokenizer;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/api/rank")
public class RankController {

    @GetMapping("/rp")
    public ResponseEntity<MessageRes> rpRank() throws IOException {

        MessageRes messageRes = new MessageRes();
        String URL = "https://kart.nexon.com/Kart/Ranking/RP/List.aspx";
        Document doc = Jsoup.connect(URL).get();

        //System.out.println(doc.html());

        Elements elem = doc.select("span[class=\"user_name\"]");
        Elements elem2 = elem.select("a");

        System.out.println(elem2.text());

        messageRes.setMessage("RP 랭킹 가져오기 성공");
        StringTokenizer st = new StringTokenizer(elem2.text()," ");
        for(int i = 0; i<10; i++){
            messageRes.setData(elem2.text());
        }


        return new ResponseEntity<MessageRes>(messageRes, HttpStatus.OK);
    }
    @GetMapping("/grang")
    public ResponseEntity<MessageRes> gRank() throws IOException {

        MessageRes messageRes = new MessageRes();
        String URL = "https://kart.nexon.com/Kart/Ranking/GrandPrix/List.aspx";
        Document doc = Jsoup.connect(URL).get();

        //System.out.println(doc.html());

        Elements elem = doc.select("span[class=\"user_name\"]");
        Elements elem2 = elem.select("a");

        System.out.println(elem2.text());

        messageRes.setMessage("grnad 랭킹 가져오기 성공");
        StringTokenizer st = new StringTokenizer(elem2.text()," ");
        for(int i = 0; i<10; i++){
            messageRes.setData(elem2.text());
        }


        return new ResponseEntity<MessageRes>(messageRes, HttpStatus.OK);
    }

}
