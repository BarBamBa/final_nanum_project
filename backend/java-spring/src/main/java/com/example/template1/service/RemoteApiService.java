package com.example.template1.service;

import com.example.template1.model.RegionCode;

import com.example.template1.repository.RegionCodeRepository;

import com.example.template1.util.WebClientUtil;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URLEncoder;
import java.util.Iterator;


@Service
@RequiredArgsConstructor
public class RemoteApiService {

    private final RegionCodeRepository regionCodeRepository;
    private final WebClientUtil webClient;

    public String getListInfo(String url) {
        JSONObject jsonObject = fetchJson(url);

        return getString(jsonObject);
    }

    public String getListInfo(String url, JSONObject data) throws IOException {
        Iterator<String> iter = data.keys();
        System.out.println("=======================================================================================");

        StringBuilder sb = new StringBuilder();
        boolean flg = true;

        while (iter.hasNext()) {
            String key = iter.next();
            System.out.print(key + " : ");
                if(flg) {
                    String value = data.getString(key);
                    System.out.print(value + ", ");
                    if (value.isEmpty()) continue;
                    sb.append(url)
                        .append("?")
                        .append(key)
                        .append("=")
                        .append(URLEncoder.encode(value, "UTF-8"));
                    flg = !flg;
                } else {
                    String value = data.getString(key);
                    System.out.print(value + ", ");
                    if (value.isEmpty()) continue;
                    sb.append("&")
                        .append(key)
                        .append("=")
                        .append(URLEncoder.encode(value, "UTF-8"));
                }
        }
        System.out.println();
        System.out.println("=======================================================================================");
        System.out.println(sb);
        System.out.println("=======================================================================================");
        JSONObject jsonObject = fetchJson(sb.toString());
        return getString(jsonObject);
    }

    private String getString(JSONObject jsonObject) {
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
    }

    public String getDetailInfo(String url, String params) {
        JSONObject jsonObject = fetchJson(url + "?progrmRegistNo=" + params);
        JSONObject object = jsonObject.getJSONObject("response")
                .getJSONObject("body")
                .getJSONObject("items")
                .getJSONObject("item")
                ;
        object = replaceRegion(object);
        object = replaceActWkdy(object);

        return object.toString();
    }

    private JSONObject fetchJson(String uri) {
        String response = webClient.get(uri, String.class);

        return XML.toJSONObject(response);
    }

    private JSONObject replaceRegion(JSONObject jsonObject) {
        String change = jsonObject.toString();

        if (jsonObject.getInt("sidoCd") == 5690000) {
            String sido = jsonObject.get("sidoCd").toString();
            change = change.replace(sido, "세종특별자치시");
        } else {
            RegionCode regionCode = regionCodeRepository
                    .findByCityCodeAndDistrictCode(
                            jsonObject.getInt("sidoCd"),
                            jsonObject.getInt("gugunCd")
                    );
            String sido = jsonObject.get("sidoCd").toString();
            String gugun = jsonObject.get("gugunCd").toString();
            change = change.replace(sido, regionCode.getCity());
            change = change.replace(gugun, regionCode.getDistrict());
        }

        return new JSONObject(change);
    }

    private JSONObject replaceActWkdy(JSONObject jsonObject) {
        String change = jsonObject.toString();
        String actWkdy = "" +jsonObject.get("actWkdy");

        StringBuilder replaceBuilder = new StringBuilder();

        String[] strArr = actWkdy.split("");
        String[] wkdy = "월화수목금토일".split("");
        for(int i=0; i<strArr.length; i++) {
            if(strArr[i].equals("1")) {
                replaceBuilder.append(wkdy[i]).append(" ");
            }
        }
        String replace = replaceBuilder.substring(0, replaceBuilder.length()-1);
        if(!replace.isEmpty()) {
            change = change.replace(actWkdy, replace);
        } else {
            change = change.replace(actWkdy, "비대면");
        }

        return new JSONObject(change);
    }
}
