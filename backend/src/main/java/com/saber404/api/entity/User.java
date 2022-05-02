package com.saber404.api.entity;

import lombok.*;
import javax.persistence.*;


@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User extends BaseEntity {

	@Column
	private String password;
	
	@Column(unique = true)
	private String nickname;
	
	@Column(unique = true)
	private String email;

}
