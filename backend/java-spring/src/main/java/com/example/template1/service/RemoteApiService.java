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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;


@Service
@RequiredArgsConstructor
public class RemoteApiService {

    private final RegionCodeRepository regionCodeRepository;
    private final WebClientUtil webClient;

//    public String getListInfo(String url) {
//        JSONObject jsonObject = fetchJson(url);
//
//        return getListString(jsonObject);
//    }

    // key, value 값을 순회하며 url을 완성하여 fetchJson의 webclient url로 보낸다.
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
                    flg = false;
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

        return getListString(jsonObject);
    }

    private String getListString(JSONObject jsonObject) {
        if (jsonObject.getJSONObject("response").getJSONObject("body").isEmpty()) {
            return null;
        }
        JSONObject orgObject = jsonObject.getJSONObject("response")
                .getJSONObject("body");
        JSONArray jsonArray = jsonObject.getJSONObject("response")
                .getJSONObject("body")
                .getJSONObject("items")
                .getJSONArray("item");
//        JSONArray newJsonArray = new JSONArray();
        for(int i = 0; i < jsonArray.length(); i++) {
            JSONObject arrayObject = jsonArray.getJSONObject(i);
            JSONObject newArrayobject = replaceRegion(arrayObject);
//            newJsonArray.put(newArrayobject);
            orgObject = replaceItem(orgObject, newArrayobject, i);
        }

//        return newJsonArray.toString();
        return orgObject.toString();
    }

    public String getMarkerList(String url, JSONArray param) {
        JSONArray markerArray = new JSONArray();

//        for(int i = 0; i < param.length()-1; i++) {
        for(int i = 0; i < 5; i++) {
            String registNo = "" + param.getJSONObject(i).getInt("progrmRegistNo");
            JSONObject object = new JSONObject(getDetailInfo(url, registNo));

            JSONObject marker = new JSONObject();

            marker.put("title", object.get("progrmSj"));

            if(object.getString("areaLalo1").equals(",")) { continue; }
            String[] arealalo = object.getString("areaLalo1").split(",");

            JSONObject latlng = new JSONObject();
            latlng.put("lat", Float.parseFloat(arealalo[0]));
            latlng.put("lng", Float.parseFloat(arealalo[1]));

            marker.put("latlng", latlng);
            marker.put("progrmRegistNo", object.getInt("progrmRegistNo"));
            marker.put("postAdres", object.getString("postAdres"));
            marker.put("progrmBgnde", object.get("progrmBgnde") + "");
            marker.put("progrmEndde", object.get("progrmEndde") + "");
            marker.put("srvcClCode", object.getString("srvcClCode"));

            markerArray.put(marker);
        }

        return markerArray.toString();
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

    private JSONObject replaceItem(JSONObject jsonObject, JSONObject object, int i) {
        String change = jsonObject.toString();
        String target = jsonObject.getJSONObject("items")
                .getJSONArray("item")
                .getJSONObject(i)
                .toString();
        String item = object.toString();
        change = change.replace(target, item);

        return new JSONObject(change);
    }
}
