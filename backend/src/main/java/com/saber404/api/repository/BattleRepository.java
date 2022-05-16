package com.saber404.api.repository;

import com.saber404.api.entity.Battle;
import com.saber404.api.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BattleRepository extends JpaRepository<Battle, String> {

    @Query(value = "select count(*) from battle b where sender_id =:senderId and receiver_id = :receiverId and status = :status", nativeQuery = true )
    int checkOverlap(String senderId, String receiverId, String status);

    @Query(value = "select * from battle b where sender_id = :senderId and status = :status", nativeQuery = true )
    List<Battle> getSendList(String senderId, String status);

    @Query(value = "select * from battle b where receiver_id = :receiverId and status = :status", nativeQuery = true )
    List<Battle> getReceiveList(String receiverId, String status);

    @Modifying
    @Query(value = "update battle b set b.status = :status where battle_id = :battleId", nativeQuery = true )
    void startBattle(String battleId, String status);

}
