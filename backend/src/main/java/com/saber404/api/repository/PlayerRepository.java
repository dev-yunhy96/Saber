package com.saber404.api.repository;

import com.saber404.api.entity.Match;
import com.saber404.api.entity.Player;
import com.saber404.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, String> {

    Optional<Player> findByCharacterName(String characterName);
}
