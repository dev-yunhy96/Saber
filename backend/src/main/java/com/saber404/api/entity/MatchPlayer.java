package com.saber404.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "match_player")
public class MatchPlayer extends BaseEntity {

    @Column
    private String characterType;

    @Column
    private String kart;

    @Column
    private String matchRank;

    @Column
    private String matchRetired;

    @Column
    private String matchWin;

    @Column
    private String matchTime;

    @Column
    private String teamId;

    @JoinColumn(name = "matches_id")
    @ManyToOne(cascade = CascadeType.MERGE)
    private Match match;

    @JoinColumn(name = "player_id")
    @ManyToOne(cascade = CascadeType.MERGE)
    private Player player;

}
