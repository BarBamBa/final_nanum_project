package com.example.template1.controller;

import com.example.template1.model.dto.RestJsonRequestDto;
import com.example.template1.model.dto.RestJsonResponseDto;
import com.example.template1.service.Test1Service;
import lombok.RequiredArgsConstructor;
import net.minidev.json.parser.ParseException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MainApiController {

    private final Test1Service test1Service;

    // 메인 페이지 호출되면 웹에서 비동기로 내부 api 호출
    // 분야별봉사참여정보목록조회(getVltrCategoryList) api 호출
    // xml 데이터를 json으로 변환 후 웹으로 반환
    String defUrl = "http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/";
    String[] funcUrl = {
            "getVltrSearchWordList",    // 검색어봉사참여정보목록조회
            "getVltrPeriodSrvcList",    // 기간별봉사참여정보목록조회
            "getVltrAreaList",          // 지역별봉사참여정보목록조회
            "getVltrCategoryList",      // 분야별봉사참여정보목록조회
            "getVltrPartcptnItem"       // 봉사참여정보상세조회
    };

    @PostMapping("/test1")
    public String apiTest1() throws IOException {
        return test1Service.getListInfo(defUrl + funcUrl[3]);
    }

    @PostMapping("/test2")
    public String apiTest2(@RequestParam String progrmRegistNo) throws IOException {
        return test1Service.getDetailInfo(defUrl + funcUrl[4], progrmRegistNo);
    }

}

