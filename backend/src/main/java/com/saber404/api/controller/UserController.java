package com.saber404.api.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.saber404.api.dto.request.LoginReq;
import com.saber404.api.dto.request.SignUpReq;
import com.saber404.api.dto.request.UpdatePasswordReq;
import com.saber404.api.dto.request.UserDTO;
import com.saber404.api.dto.response.GetUserByProfileRes;

import com.saber404.api.dto.response.BaseResponseDto;

import com.saber404.api.dto.response.MessageRes;
import com.saber404.api.entity.User;
import com.saber404.api.service.JwtTokenService;
import com.saber404.api.service.UserService;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/users")
public class UserController {
	
	private final UserService userService;

	private final JwtTokenService jwtTokenService;

	@PostMapping("/signup")
	public ResponseEntity<MessageRes> signUp(@Valid @RequestBody SignUpReq signUpReq)  {
		MessageRes messageRes = new MessageRes();
		UserDTO userDto = new UserDTO(signUpReq);

		if (userService.createUser(userDto)) {
			messageRes.setMessage("유저생성 성공");
			messageRes.setData("user email : " + userDto.getEmail());
			return new ResponseEntity<MessageRes>(messageRes, HttpStatus.CREATED);
		}

		messageRes.setMessage("유저생성 실패");
		return new ResponseEntity<MessageRes>(messageRes, HttpStatus.BAD_REQUEST);
	}

	//아이디와 비밀번호를 입력받고, JWT 토큰 및 유저 정보를 반환
	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody LoginReq loginReq){
		HashMap<String, String> map = new HashMap<String, String>();
		
		try {
			String token = userService.login(loginReq);
			if(!token.equals("")) {
				map.put("message", "로그인 성공");
				map.put("email", loginReq.getEmail())	;
	            map.put("token",token);
				return new ResponseEntity<Map<String,String>>(map, HttpStatus.OK);
			}
			map.put("message", "로그인 실패");
		}catch(Exception e){
			e.printStackTrace();
			map.put("message", "로그인 실패");
			return new ResponseEntity<Map<String,String>>(map, HttpStatus.BAD_REQUEST);
		}
		map.put("message", "로그인 실패");
		return new ResponseEntity<Map<String,String>>(map, HttpStatus.BAD_REQUEST);
	}


	@GetMapping("/")
	public ResponseEntity<GetUserByProfileRes> getUser (@ApiIgnore @RequestHeader("Authorization") String accessToken) {

		UserDTO user = userService.getUserById(accessToken);
		return new ResponseEntity<GetUserByProfileRes>(new GetUserByProfileRes(user), HttpStatus.OK);
	}
	@PutMapping("/delete/{id}")
	public ResponseEntity<? extends BaseResponseDto> deleteUser (@PathVariable("id") String id){
		if(userService.delete(id))
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(BaseResponseDto.of(HttpStatus.ACCEPTED.value(), "Success"));
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseDto.of(HttpStatus.NO_CONTENT.value(), "Fail"));
	}
	//업데이트 패스워드
	@PutMapping("/update")
	public ResponseEntity<? extends BaseResponseDto> updateUserPassword (
			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@RequestBody @ApiParam(value = "새로 바꿀 비밀번호", required = true)UpdatePasswordReq updatePasswordReq){
		User user = jwtTokenService.convertTokenToUser(accessToken);
		String email = user.getEmail();
		System.out.println(email);
		if(userService.updatePassword(updatePasswordReq, email))
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(BaseResponseDto.of(HttpStatus.ACCEPTED.value(), "Success"));
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseDto.of(HttpStatus.NO_CONTENT.value(), "Fail"));

	}

}
