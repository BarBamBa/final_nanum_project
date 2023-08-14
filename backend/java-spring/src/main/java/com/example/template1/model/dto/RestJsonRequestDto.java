package com.example.template1.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RestJsonRequestDto {

    private String keyword; // 검색어

    private String schCateGu;   // 검색어 구분

    private int schSido;    //  시도코드

    private int schSign1;   // 시군구코드

    private int upperCICode; // 상위분야코드

    private int nanmCICode; // 하위분야코드

    private int progrmBgnde;    // 봉사시작일자

    private int progrmEndde;    // 봉사종료일자

    private String adultPosblAt;    // 성인가능여부

    private String yngbgsPosblAt;   // 청소년가능여부

    private int actBeginTm; // 봉사시작시간

    private int actEndTm;   // 봉사종료시간

    private int noticeBgnde;    // 모집시작일

    private int noticeEndde;    // 모집종료일

    private String actPlace;    // 봉사장소

    private String nanmmbyNm;   // 모집기관

}