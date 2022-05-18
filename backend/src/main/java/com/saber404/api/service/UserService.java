package com.saber404.api.service;


import com.saber404.api.config.JwtTokenProvider;
import com.saber404.api.dto.request.LoginReq;
import com.saber404.api.dto.request.UpdatePasswordReq;
import com.saber404.api.dto.request.UserDTO;
import com.saber404.api.entity.User;
import com.saber404.api.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
public class UserService {
	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private JwtTokenProvider jwtTokenProvider;
	private JwtTokenService jwtTokenService;
	private ModelMapper modelMapper;

	@Autowired
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, JwtTokenService jwtTokenService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtTokenProvider = jwtTokenProvider;
		this.jwtTokenService = jwtTokenService;
		this.modelMapper = new ModelMapper();
	}

	@Transactional
	public boolean createUser(UserDTO userDto)  {
		//throws AlreadyExistEmailException, AlreadyExistNicknameException
		String email = userDto.getEmail();
		Optional<User> userByEmail = userRepository.findByEmail(email);
		String nickname = userDto.getNickname();
		Optional<User> userByNickname = userRepository.findByNickname(nickname);
		if (userByEmail.isPresent()) {
			log.info("user email already exists");
			//throw new AlreadyExistEmailException();
		}

		if (userByNickname.isPresent()) {
			log.info("user nickname already exists");
			//throw new AlreadyExistNicknameException();
		}

		//
		User entity = modelMapper.map(userDto, User.class);
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		userRepository.save(entity);
		return true;
	}

	//구 matchPassword
	//생 비밀번호와, 암호화된 비밀번호를 입력받고, 두 비밀번호의 동일 여부를 반환
	private boolean comparePassword(String rawPassword, String encryptPassword) {
		System.out.println(rawPassword+"          "+ encryptPassword+"콤페얼페스워드 찍히는지 확인");
		return passwordEncoder.matches(rawPassword,encryptPassword);
	}


	//Login 데이터를 받고, JWT를 반환하는 메소드
	@Transactional
	public String login(LoginReq data) {
		User user = userRepository.findByEmail(data.getEmail()).orElseThrow(()->new UsernameNotFoundException("사용자를 찾을 수 없습니다.") );
		System.out.println(user.getEmail());
		if(user.isDelYn()==true)
			return"";
		if(comparePassword(data.getPassword(), user.getPassword())) {

			return jwtTokenProvider.createToken(user,user.getRoles());
			//return jwtTokenProvider.createToken(user);
		}

		return "";
	}

	public UserDTO getUserById(String accessToken) {
		try {
			User user = jwtTokenService.convertTokenToUser(accessToken);
			return modelMapper.map(user, UserDTO.class);
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	@Transactional
	public boolean updatePassword(UpdatePasswordReq updatePasswordReq, String email) {
		Optional<User> user = userRepository.findByEmail(email);


		if(user.isPresent()){
				log.info(updatePasswordReq.getNewPassword());
				log.info(passwordEncoder.encode(updatePasswordReq.getNewPassword()));
				user.get().setPassword(passwordEncoder.encode(updatePasswordReq.getNewPassword()));
				log.info("passwordEncoder : "+ passwordEncoder.encode(updatePasswordReq.getNewPassword()));
				userRepository.save(user.get());
				return true;

		}
		return false;

	}

	@Transactional
	public boolean delete(String id) {
		Optional<User> user = userRepository.findById(id);
		if(user.isPresent() && user.get().isDelYn() ==false){
			user.get().setDelYn(true);

			userRepository.save(user.get());
			return true;
		}else{
			return false;
		}
	}





}
