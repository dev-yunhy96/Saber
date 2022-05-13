package com.saber404.api.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
@Builder
@Table(name = "user")
public class User extends BaseEntity implements UserDetails {

	@Column
	private String password;
	
	@Column(unique = true)
	private String nickname;
	
	@Column(unique = true)
	private String email;

	@Column(columnDefinition = "boolean default false")
	private boolean delYn;

	@ElementCollection(fetch = FetchType.EAGER)
	@Builder.Default
	private List<String> roles = new ArrayList<>();

	public User(String password, String nickname, String email, boolean delYn, List<String> roles) {
		this.password = password;
		this.nickname = nickname;
		this.email = email;
		this.delYn = delYn;
		this.roles = roles;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles.stream()
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
	}


	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
