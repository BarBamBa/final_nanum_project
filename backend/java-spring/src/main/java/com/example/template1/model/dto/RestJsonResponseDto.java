package com.example.template1.model.dto;

import lombok.*;
import org.json.JSONObject;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestJsonResponseDto {
    private int progRegistNo;

    private String progrmSj;

    private int progrmSttusSe;

    private int progrmBgnde;

    private int progrmEndde;

    private int actBeginTm;

    private int actEndTm;

    private int noticeBgnde;

    private int noticeEndde;

    private int rcritNmpr;

    private int actWkdy;

    private String srvcClCode;

    private String adultPosblAt;

    private String yngbgsPosblAt;

    private String grpPosblAt;

    private String mnnstNm;

    private String nanmmbyNm;

    private String actPlace;

    private String areaLalo1;

    private String nanmmbyNmAdmn;

    private String telno;

    private String fxnum;

    private String postAdres;

    private String email;

    private String progrmCn;

    private String url;

    private String sido;

    private String gugun;

}
