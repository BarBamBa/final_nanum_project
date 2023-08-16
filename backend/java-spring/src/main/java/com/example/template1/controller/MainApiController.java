package com.example.template1.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MainApiController {

    // 메인 페이지 호출되면 웹에서 비동기로 내부 api 호출
    // 분야별봉사참여정보목록조회(getVltrCategoryList) api 호출
    // xml 데이터를 json으로 변환 후 웹으로 반환

    // 프론트에서 파라미터와 함께 백 api 호출
    // 백에서는 넘겨받은 파라미터로 외부 api url 구성하여 호출
    // 외부 api 호출하여 반환받은 xml 데이터를 json으로 변환하여 프론트에 맞게 다듬고 프론트로 반환
    String defUrl = "http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/";
    String[] funcUrl = {
            "getVltrSearchWordList",    // 검색어봉사참여정보목록조회
            "getVltrPeriodSrvcList",    // 기간별봉사참여정보목록조회
            "getVltrAreaList",          // 지역별봉사참여정보목록조회
            "getVltrCategoryList",      // 분야별봉사참여정보목록조회
            "getVltrPartcptnItem"       // 봉사참여정보상세조회
    };

}