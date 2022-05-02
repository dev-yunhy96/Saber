package com.saber404.api.service;


import com.saber404.api.dto.request.LoginReq;
import com.saber404.api.dto.request.UserDTO;
import com.saber404.api.entity.User;
import com.saber404.api.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
public class UserService {
	private UserRepository userRepository;
	private ModelMapper modelMapper;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
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
		userRepository.save(entity);
		return true;
	}


	//Login 데이터를 받고, JWT를 반환하는 메소드
	@Transactional
	public String login(LoginReq data) {
		Optional<User> user = userRepository.findByEmail(data.getEmail() );
		if(data.getPassword().equals( user.get().getPassword())) {
			return "성공";
		}
		return "";
	}





}
