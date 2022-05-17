package com.saber404.api.service;

import com.saber404.api.dto.request.BattleSendDto;
import com.saber404.api.entity.Battle;
import com.saber404.api.entity.Player;
import com.saber404.api.repository.BattleRepository;
import com.saber404.api.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class BattleService {

    private final BattleRepository battleRepository;

    private final PlayerRepository playerRepository;

    @Transactional
    public boolean sendBattle (BattleSendDto battleSendDto) {
        Battle battle = new Battle();
        Optional<Player> sender = playerRepository.findByCharacterName(battleSendDto.getSender());
        Optional<Player> receiver = playerRepository.findByCharacterName(battleSendDto.getReceiver());
        if(battleRepository.checkOverlap(sender.get().getAccountNo(), receiver.get().getAccountNo(), "0") > 0) {
            return false;
        }
        battle.setSender(sender.get());
        battle.setReceiver(receiver.get());
        battle.setStatus("0");
        battle.setSendTime(Instant.now().toString().substring(0, 19));
        battleRepository.save(battle);
        return true;
    }

    @Transactional
    public List<Battle> getSendList (String senderId) {
        return battleRepository.getSendList(senderId, "0");
    }

    @Transactional
    public List<Battle> getReceiveList (String receiverId) {
        return battleRepository.getReceiveList(receiverId, "0");
    }

    @Transactional
    public boolean startBattle (String battleId) {
        battleRepository.changeStatus(battleId, "1");
        battleRepository.setStartTime(battleId, Instant.now().toString().substring(0, 19));
        return true;
    }

    @Transactional
    public boolean cancelBattle (String battleId) {
        battleRepository.changeStatus(battleId, "2");
        return true;
    }
    @Transactional
    public boolean winner (String battleId, String winner) {
        battleRepository.changeStatus(battleId, "3");
        battleRepository.changeWinner(battleId, winner);
        return true;
    }

    @Transactional
    public Battle findByBattleId (String battleId) {
        return battleRepository.findById(battleId).get();
    }

}
