package com.example.template1.model.dto;

import com.example.template1.model.Volunteer;
import lombok.*;
import org.json.JSONObject;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerRequestDto {

    private int number;
    private String title;
    private String org;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int rStatus;
    private String city;
    private String district;
    private char aFlg;
    private char tFlg;
    private String category;
    private String location;
    private int startTime;
    private int endTime;
    private LocalDateTime rStartDate;
    private LocalDateTime rEndDate;
    private int rCapacity;

    @Builder
    public VolunteerRequestDto(JSONObject jsonObject, DateTimeFormatter formatter) {

        this.number = jsonObject.getInt("progrmRegistNo");
        this.title = jsonObject.getString("progrmSj");
        this.org = jsonObject.getString("mnnstNm");
        this.startDate = LocalDate.parse(jsonObject.getInt("progrmBgnde") + "", formatter).atStartOfDay();
        this.endDate = LocalDate.parse(jsonObject.getInt("progrmEndde") + "", formatter).atStartOfDay();
        this.rStatus = jsonObject.getInt("progrmSttusSe");
        this.city = jsonObject.getString("sidoCd");
        this.district = jsonObject.getString("gugunCd");
        this.aFlg = jsonObject.getString("adultPosblAt").charAt(0);
        this.tFlg = jsonObject.getString("yngbgsPosblAt").charAt(0);
        this.category = jsonObject.getString("srvcClCode");
        this.location = jsonObject.getString("actPlace");
        this.startTime = jsonObject.getInt("actBeginTm");
        this.endTime = jsonObject.getInt("actEndTm");
        this.rStartDate = LocalDate.parse(jsonObject.getInt("noticeBgnde") + "", formatter).atStartOfDay();
        this.rEndDate = LocalDate.parse(jsonObject.getInt("noticeEndde") + "", formatter).atStartOfDay();
        this.rCapacity = jsonObject.getInt("rcritNmpr");
    }

    public Volunteer toEntity() {
        return Volunteer.builder()
                .number(number)
                .title(title)
                .org(org)
                .startDate(startDate)
                .endDate(endDate)
                .rStatus(rStatus)
                .city(city)
                .district(district)
                .aFlg(aFlg)
                .tFlg(tFlg)
                .category(category)
                .startTime(startTime)
                .endTime(endTime)
                .rStartDate(rStartDate)
                .rEndDate(rEndDate)
                .rCapacity(rCapacity)
                .build();
    }
}
