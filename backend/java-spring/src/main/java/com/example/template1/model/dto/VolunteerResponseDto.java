package com.example.template1.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.json.JSONObject;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VolunteerResponseDto {
    private int num;

    private String title;

    private String org;

    private int startDate;

    private int endDate;

    private int rStatus;

    private int cityCode;

    private int districtCode;

    public VolunteerResponseDto responseDto(JSONObject jsonObject) {
        return VolunteerResponseDto.builder()
                .num(jsonObject.getInt("progrmRegistNo"))
                .title(jsonObject.getString("progrmSj"))
                .org(jsonObject.getString("nanmmbyNm"))
                .startDate(jsonObject.getInt("progrmBgnde"))
                .endDate(jsonObject.getInt("progrmEndde"))
                .rStatus(jsonObject.getInt("progrmSttusSe"))
                .cityCode(jsonObject.getInt("sidoCd"))
                .districtCode(jsonObject.getInt("gugunCd"))
                .build();
    }
}
