package com.saber404.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "player")
public class Player{

    @Id
    @Column
    private String accountNo;

    @Column
    private String characterName;

    @Column
    private String lastUpdateTime;

}
