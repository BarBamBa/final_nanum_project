package com.example.template1.controller;

import com.example.template1.model.Users;
import com.example.template1.model.Volunteer;
import com.example.template1.model.dto.VolunteerRequestDto;
import com.example.template1.model.dto.VolunteerResponseDto;
import com.example.template1.repository.UsersRepository;
import com.example.template1.service.ApplicantService;
import com.example.template1.service.UserService;
import com.example.template1.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
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
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd", Locale.KOREA);

    @PostMapping("/reserve")  // 봉사활동 예약
    public ResponseEntity addVolunteerAndApplication(@RequestBody String data) {

        VolunteerRequestDto dto = new VolunteerRequestDto(new JSONObject(data).getJSONObject("data"));
        LocalDateTime date = LocalDate.parse(new JSONObject(data).getString("date"), formatter).atStartOfDay();
        Long uid = new JSONObject(data).getLong("id");

        volunteerService.volunteerValidation(dto, uid, date);

        return ResponseEntity.ok().build();
    }
}
