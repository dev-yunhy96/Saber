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
    @ManyToOne(cascade = CascadeType.ALL)
    private Player sender;

    @JoinColumn(name = "receiver_id")
    @ManyToOne(cascade = CascadeType.ALL)
    private Player receiver;

    @Column
    private String status;

    @Column
    private String winner;

    @Column
    private String sendTime;

    @Column
    private String startTime;

}
