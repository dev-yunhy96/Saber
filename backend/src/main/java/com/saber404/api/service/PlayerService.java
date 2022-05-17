package com.saber404.api.service;

import com.saber404.api.entity.Player;
import com.saber404.api.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Transactional
    public Optional<Player> findPlayer(String characterName) {
        Optional<Player> player = playerRepository.findByCharacterName(characterName);
        return player;
    }

    @Transactional
    public boolean savePlayer(Player player) {
        playerRepository.save(player);
        return true;
    }

}
