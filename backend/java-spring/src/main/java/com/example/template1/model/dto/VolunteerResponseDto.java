package com.example.template1.model.dto;

import com.example.template1.model.Volunteer;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class VolunteerResponseDto {
    private int progrmRegistNo;
    private String progrmSj;
    private String mnnstNm;
    private LocalDateTime progrmBgnde;
    private LocalDateTime progrmEndde;
    private int progrmSttusSe;
    private String sidoCd;
    private String gugunCd;
    private char adultPosblAt;
    private char yngbgsPosblAt;
    private String srvcClCode;
    private String actPlace;
    private int actBeginTm;
    private int actEndTm;
    private LocalDateTime noticeBgnde;
    private LocalDateTime noticeEndde;
    private int rcritNmpr;

    public VolunteerResponseDto(Volunteer volunteer) {
        this.progrmRegistNo = volunteer.getNumber();
        this.progrmSj = volunteer.getTitle();
        this.mnnstNm = volunteer.getOrg();
        this.progrmBgnde = volunteer.getStartDate();
        this.progrmEndde = volunteer.getEndDate();
        this.progrmSttusSe = volunteer.getRStatus();
        this.sidoCd = volunteer.getCity();
        this.gugunCd = volunteer.getDistrict();
        this.adultPosblAt = volunteer.getAFlg();
        this.yngbgsPosblAt = volunteer.getTFlg();
        this.srvcClCode = volunteer.getCategory();
        this.actPlace = volunteer.getLocation();
        this.actBeginTm = volunteer.getStartTime();
        this.actEndTm = volunteer.getEndTime();
        this.noticeBgnde = volunteer.getRStartDate();
        this.noticeEndde = volunteer.getREndDate();
        this.rcritNmpr = volunteer.getRCapacity();
    }

}
