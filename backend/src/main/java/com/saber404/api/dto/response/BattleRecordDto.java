package com.saber404.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BattleRecordDto {

    private Integer win;
    private Integer lose;
    private Integer total;
}
