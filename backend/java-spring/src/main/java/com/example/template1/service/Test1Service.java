package com.example.template1.service;

import com.example.template1.model.Users;
import com.example.template1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class Test1Service {

    private final UsersRepository usersRepository;

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

    public String getApiBody(String url) throws IOException {
        JSONObject jsonObject = fetchJson(url);
        StringBuilder str = new StringBuilder();
        JSONArray jsonArray = jsonObject.getJSONObject("response")
                .getJSONObject("body")
                .getJSONObject("items")
                .getJSONArray("item")
                ;

        for(int i = 0; i < jsonArray.length(); i++) {
            JSONObject object = jsonArray.getJSONObject(i);
            str.append("프로그램 등록번호 : ").append(object.get("progrmRegistNo")).append(", ");
            str.append("프로그램명 : ").append(object.get("progrmSj")).append(", ");
            str.append("등록기관 : ").append(object.get("nanmmbyNm")).append(", ");
            str.append("시작일자 : ").append(object.get("progrmBgnde")).append(", ");
            str.append("종료일자 : ").append(object.get("progrmEndde")).append(", ");
            str.append("모집상태 : ").append(object.get("progrmSttusSe")).append(", ");
            str.append("시도코드 : ").append(object.get("sidoCd")).append(", ");
            str.append("시군구코드 : ").append(object.get("gugunCd")).append("\n");
        }
        System.out.println(jsonArray);
        System.out.println(str);

        return jsonArray.toString();
    }

    public String getApiBodyToString(String url, String params) throws IOException {
        JSONObject jsonObject = fetchJson(url + "?progrmRegistNo=" + params);
        StringBuilder str = new StringBuilder();
        JSONObject object = jsonObject.getJSONObject("response")
                .getJSONObject("body")
                .getJSONObject("items")
                .getJSONObject("item")
                ;

        str.append("프로그램 등록번호 : ").append(object.get("progrmRegistNo")).append(", ");
        str.append("프로그램명 : ").append(object.get("progrmSj")).append(", ");
        str.append("모집상태 : ").append(object.get("progrmSttusSe")).append(", ");
        str.append("시작일자 : ").append(object.get("progrmBgnde")).append(", ");
        str.append("종료일자 : ").append(object.get("progrmEndde")).append(", ");
        str.append("시작시간 : ").append(object.get("actBeginTm")).append(", ");
        str.append("종료시간 : ").append(object.get("actEndTm")).append(", ");
        str.append("모집시작일 : ").append(object.get("noticeBgnde")).append(", ");
        str.append("모집종료일 : ").append(object.get("noticeEndde")).append(", ");
        str.append("모집인원 : ").append(object.get("rcritNmpr")).append(", ");
        str.append("활동요일 : ").append(object.get("actWkdy")).append(", ");
        str.append("봉사분야 : ").append(object.get("srvcClCode")).append(", ");
        str.append("성인가능여부 : ").append(object.get("adultPosblAt")).append(", ");
        str.append("청소년가능여부 : ").append(object.get("yngbgsPosblAt")).append(", ");
        str.append("단체가능여부 : ").append(object.get("grpPosblAt")).append(", ");
        str.append("모집기관 : ").append(object.get("mnnstNm")).append(", ");
        str.append("등록기관 : ").append(object.get("nanmmbyNm")).append(", ");
        str.append("봉사장소 : ").append(object.get("actPlace")).append(", ");
        str.append("경위도 : ").append(object.get("areaLalo1")).append(", ");
        str.append("담당자명 : ").append(object.get("nanmmbyNmAdmn")).append(", ");
        str.append("전화번호 : ").append(object.get("telno")).append(", ");
        str.append("FAX : ").append(object.get("fxnum")).append(", ");
        str.append("담당자 주소 : ").append(object.get("postAdres")).append(", ");
        str.append("이메일 : ").append(object.get("email")).append(", ");
        str.append("내용 : ").append(object.get("progrmCn")).append(", ");
        str.append("시도코드 : ").append(object.get("sidoCd")).append(", ");
        str.append("시군구코드 : ").append(object.get("gugunCd")).append("\n");

        System.out.println(object);
        System.out.println(str);
        return str.toString();
    }

    private JSONObject fetchJson(String params) throws IOException {
        //URLConnection에 대한 doOutput 필드값을 지정된 값으로 설정
        //URL 연결은 입출력에 사용
        //URL 연결을 출력용으로 사용하려는 경우 DoOutput 플래그를 true로 설정하고,
        //그렇지 않은 경우는 false로 설정, 기본값은 false
        URL url = new URL(params);
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
}
