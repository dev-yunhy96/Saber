package com.saber404.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table
public class Battle extends BaseEntity{

    @JoinColumn(name = "sender_id")
    @ManyToOne
    private Player sender;

    @JoinColumn(name = "receiver_id")
    @ManyToOne
    private Player receiver;

    @JoinColumn(name = "winner_id")
    @ManyToOne
    private Player winner;

    @Column
    private String status;

    @Column
    private String sendTime;

    @Column
    private String startTime;

    @Column
    private String title;

    @Column
    private Integer password;

}
