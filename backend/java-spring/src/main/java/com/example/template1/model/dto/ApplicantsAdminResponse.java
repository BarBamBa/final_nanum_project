package com.example.template1.model.dto;

import com.example.template1.model.Applicants;
import lombok.Getter;

import java.time.LocalDateTime;
@Getter
public class ApplicantsAdminResponse {

    private final Long id;

    private final Long userId;

    private final Long volunteerId;

    private final String volunteerTitle;

    private final LocalDateTime selectedDay;

    private final char status;

    private final LocalDateTime createAt;

    private final LocalDateTime updateAt;

    private final String userName;

    private final int volunteerCode;

    public ApplicantsAdminResponse(Applicants applicants) {
        this.id = applicants.getId();
        this.userId = applicants.getUsers().getId();
        this.volunteerId = applicants.getVolunteer().getId();
        this.volunteerTitle = applicants.getVolunteer().getTitle();
        this.selectedDay = applicants.getSelectedDay();
        this.status = applicants.getStatus();
        this.createAt = applicants.getCreateAt();
        this.updateAt = applicants.getUpdateAt();
        this.userName = applicants.getUsers().getName();
        this.volunteerCode = applicants.getVolunteer().getNumber();
    }
}
