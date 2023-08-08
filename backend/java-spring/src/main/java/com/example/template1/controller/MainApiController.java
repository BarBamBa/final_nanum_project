package com.example.template1.controller;

import com.example.template1.service.RemoteApiService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/api")
@RequiredArgsConstructor
public class MainApiController {

    private final RemoteApiService remoteApiService;

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

    @PostMapping("/list")
    public String SearchListByKeyword(@RequestBody(required = false) String data) throws IOException {
        if(data != null) {
            String keyword = new JSONObject(data).getString("keyword");
            return remoteApiService.getListInfo(defUrl + funcUrl[0], keyword);
        }
        return remoteApiService.getListInfo(defUrl + funcUrl[0]);
    }

    @PostMapping("/detail")
    public String SearchDetailByNumber(@RequestBody String data) throws IOException {
        String progrmRegistNo = new JSONObject(data).getString("progrmRegistNo");
        return remoteApiService.getDetailInfo(defUrl + funcUrl[4], progrmRegistNo);
    }

}

