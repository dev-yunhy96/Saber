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
@Table(name = "matches")
public class Match {

    @Id
    @Column
    private String matchId;

    @Column
    private String matchType;

    @Column
    private String startTime;

    @Column
    private String endTime;

    @Column
    private String trackId;

    @Column
    private Long playerCount;

}
