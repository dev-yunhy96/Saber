package com.saber404.api.dto.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class WalletReq {
    private String ownerId;
    private String address;
    private String privateKey;
}
