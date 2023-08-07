package com.example.template1.service;

import com.example.template1.model.RegionCode;
import com.example.template1.model.Users;

import com.example.template1.repository.RegionCodeRepository;
import com.example.template1.repository.UsersRepository;

import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;


@Service
@RequiredArgsConstructor
public class Test1Service {

    private final UsersRepository usersRepository;
    private final RegionCodeRepository regionCodeRepository;
    private final WebClient webClient;

    public Users addUser() {
        Users users = Users.builder()
                .name("둘리")
                .nickname("애기공룡")
                .email("hoi@test.com")
                .age(10)
                .phone("0101010101")
                .build();

        return usersRepository.save(users);
    }

    public String getListInfo(String url) throws IOException {
        JSONObject jsonObject = fetchJson(url);
        JSONArray jsonArray = jsonObject.getJSONObject("response")
                .getJSONObject("body")
                .getJSONObject("items")
                .getJSONArray("item");
        JSONArray newJsonArray = new JSONArray();
        for(int i = 0; i < jsonArray.length(); i++) {
            JSONObject arrayObject = jsonArray.getJSONObject(i);
            JSONObject newArrayobject = replaceRegion(arrayObject);
            newJsonArray.put(newArrayobject);
        }
        return newJsonArray.toString();
//        List<RestJsonResponseDto> responseDtoList = new ArrayList<>();

//        for(int i = 0; i < jsonArray.length(); i++) {
//            JSONObject object = jsonArray.getJSONObject(i);
//            RegionCode regionCode = regionCodeRepository
//                .findByCityCodeAndDistrictCode(
//                object.getInt("sidoCd"), object.getInt("gugunCd")
//                );
//            RestJsonResponseDto responseDto = RestJsonResponseDto.builder()
//                .progRegistNo(object.getInt("progrmRegistNo"))
//                .progrmSj(object.getString("progrmSj"))
//                .progrmSttusSe(object.getInt("progrmSttusSe"))
//                .progrmBgnde(object.getInt("progrmBgnde"))
//                .progrmEndde(object.getInt("progrmEndde"))
//                .actBeginTm(object.getInt("actBeginTm"))
//                .actEndTm(object.getInt("actEndTm"))
//                .noticeBgnde(object.getInt("noticeBgnde"))
//                .noticeEndde(object.getInt("noticeEndde"))
//                .srvcClCode(object.getString("srvcClCode"))
//                .adultPosblAt(object.getString("adultPosblAt"))
//                .yngbgsPosblAt(object.getString("yngbgsPosblAt"))
//                .url(object.getString("url"))
//                .nanmmbyNm(object.getString("nanmbyNm"))
//                .actPlace(object.getString("actPlace"))
//                .sido(regionCode.getCity())
//                .gugun(regionCode.getDistrict())
//                .build();
//            responseDtoList.add(responseDto);
//            System.out.println(jsonObject);
//            System.out.println(responseDto);

//        for(int i = 0; i < jsonArray.length(); i++) {
//            JSONObject object = jsonArray.getJSONObject(i);
//            str.append("프로그램 등록번호 : ").append(object.get("progrmRegistNo")).append(", ");
//            str.append("프로그램명 : ").append(object.get("progrmSj")).append(", ");
//            str.append("모집기관 : ").append(object.get("nanmmbyNm")).append(", ");
//            str.append("시작일자 : ").append(object.get("progrmBgnde")).append(", ");
//            str.append("종료일자 : ").append(object.get("progrmEndde")).append(", ");
//            str.append("모집상태 : ").append(object.get("progrmSttusSe")).append(", ");
//            str.append("시도코드 : ").append(object.get("sidoCd")).append(", ");
//            str.append("시군구코드 : ").append(object.get("gugunCd")).append("\n");
//        }

//        return jsonArray.toString();
    }

    public String getDetailInfo(String url, String params) throws IOException {
        JSONObject jsonObject = fetchJson(url + "?progrmRegistNo=" + params);

        JSONObject object = jsonObject.getJSONObject("response")
                .getJSONObject("body")
                .getJSONObject("items")
                .getJSONObject("item")
                ;
//        StringBuilder str = new StringBuilder();
//        str.append("프로그램 등록번호 : ").append(object.get("progrmRegistNo")).append(", ");
//        str.append("프로그램명 : ").append(object.get("progrmSj")).append(", ");
//        str.append("모집상태 : ").append(object.get("progrmSttusSe")).append(", ");
//        str.append("시작일자 : ").append(object.get("progrmBgnde")).append(", ");
//        str.append("종료일자 : ").append(object.get("progrmEndde")).append(", ");
//        str.append("시작시간 : ").append(object.get("actBeginTm")).append(", ");
//        str.append("종료시간 : ").append(object.get("actEndTm")).append(", ");
//        str.append("모집시작일 : ").append(object.get("noticeBgnde")).append(", ");
//        str.append("모집종료일 : ").append(object.get("noticeEndde")).append(", ");
//        str.append("모집인원 : ").append(object.get("rcritNmpr")).append(", ");
//        str.append("활동요일 : ").append(object.get("actWkdy")).append(", ");
//        str.append("봉사분야 : ").append(object.get("srvcClCode")).append(", ");
//        str.append("성인가능여부 : ").append(object.get("adultPosblAt")).append(", ");
//        str.append("청소년가능여부 : ").append(object.get("yngbgsPosblAt")).append(", ");
//        str.append("단체가능여부 : ").append(object.get("grpPosblAt")).append(", ");
//        str.append("모집기관 : ").append(object.get("mnnstNm")).append(", ");
//        str.append("등록기관 : ").append(object.get("nanmmbyNm")).append(", ");
//        str.append("봉사장소 : ").append(object.get("actPlace")).append(", ");
//        str.append("경위도 : ").append(object.get("areaLalo1")).append(", ");
//        str.append("담당자명 : ").append(object.get("nanmmbyNmAdmn")).append(", ");
//        str.append("전화번호 : ").append(object.get("telno")).append(", ");
//        str.append("FAX : ").append(object.get("fxnum")).append(", ");
//        str.append("담당자 주소 : ").append(object.get("postAdres")).append(", ");
//        str.append("이메일 : ").append(object.get("email")).append(", ");
//        str.append("내용 : ").append(object.get("progrmCn")).append(", ");
//        str.append("시도코드 : ").append(object.get("sidoCd")).append(", ");
//        str.append("시군구코드 : ").append(object.get("gugunCd")).append("\n");

        System.out.println(object);
        return object.toString();
    }

    private JSONObject fetchJson(String uri) throws IOException {
        //URLConnection에 대한 doOutput 필드값을 지정된 값으로 설정
        //URL 연결은 입출력에 사용
        //URL 연결을 출력용으로 사용하려는 경우 DoOutput 플래그를 true로 설정하고,
        //그렇지 않은 경우는 false로 설정, 기본값은 false
        Mono<JSONObject> object = webClient.get()
                .uri(uri)
                .accept(MediaType.APPLICATION_ATOM_XML)
                .retrieve()
                .bodyToMono(JSONObject.class);
        URL url = new URL(uri);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setConnectTimeout(5000); //서버에 연결되는 Timeout 시간 설정
        con.setReadTimeout(5000); // InputStream 읽어 오는 Timeout 시간 설정
        con.setRequestMethod("GET");
        con.setDoOutput(false);
        return xmlToJson(con.getInputStream());
    }

    private JSONObject xmlToJson(InputStream xml) throws IOException {
        StringBuilder sb = new StringBuilder();
        BufferedReader br = new BufferedReader(
                new InputStreamReader(xml, "utf-8"));
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line).append("\n");
        }
        br.close();
        return XML.toJSONObject(sb.toString());
    }

    private JSONObject replaceRegion(JSONObject jsonObject) {
        String change = jsonObject.toString();
        String key1 = "sidoCd";
        String key2 = "gugunCd";
        RegionCode regionCode = regionCodeRepository
                .findByCityCodeAndDistrictCode(
                        jsonObject.getInt("sidoCd"),
                        jsonObject.getInt("gugunCd")
                );
        String sido = jsonObject.get("sidoCd").toString();
        String gugun = jsonObject.get("gugunCd").toString();

        change = change.replace(sido, regionCode.getCity());
        change = change.replace(gugun, regionCode.getDistrict());

        return new JSONObject(change);
    }

}
