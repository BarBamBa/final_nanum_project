package com.example.template1.controller;

import com.example.template1.model.Users;
import com.example.template1.model.Volunteer;
import com.example.template1.model.dto.VolunteerRequestDto;
import com.example.template1.model.dto.VolunteerResponseDto;
import com.example.template1.service.ApplicantService;
import com.example.template1.service.UserService;
import com.example.template1.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class VolunteerController {

    private final VolunteerService volunteerService;
    private final ApplicantService applicantService;
    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMdd", Locale.KOREA);

    @PostMapping("/reserve")
    public String addVolunteerAndApplication(@RequestBody String data) {

        VolunteerRequestDto dto = new VolunteerRequestDto(new JSONObject(data).getJSONObject("data"), dateTimeFormatter);
        Users users = usersFactory();
        Volunteer volunteer;
        if (volunteerService.existByNumber(dto.getNumber())) {
            volunteer = volunteerService.findVolunteerByNumber(dto.getNumber());
        } else {
            volunteer = volunteerService.addVolunteer(dto);
        }
        if (applicantService.existByUserIdAndVolunteerIdAndSelectedDay(users.getId(), volunteer.getId(),
                LocalDate.parse(new JSONObject(data).getJSONObject("date")
                        .getString("selectedDay"), dateTimeFormatter).atStartOfDay())) {
            System.out.println("application already exists");
        } else {
            applicantService.addApplicant(users, volunteer,
                LocalDate.parse(new JSONObject(data).getJSONObject("date")
                        .getString("selectedDay"), dateTimeFormatter).atStartOfDay());
        }
        return new VolunteerResponseDto(volunteer).toString();
    }

    private Users usersFactory() {
        return Users.builder()
                .name("test")
                .phone("test")
                .address("test")
                .password("test")
                .email("test")
                .nickname("test")
                .age(99)
                .build();
    }
}
