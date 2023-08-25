package com.example.template1.model.dto;

import com.example.template1.model.Applicants;
import com.example.template1.model.Users;
import com.example.template1.model.Volunteer;
import lombok.Getter;

import java.time.LocalDateTime;
@Getter
public class ApplicantsResponse {

    private final Long id;

    private final Long userId;

    private final Long volunteerId;

    private final LocalDateTime selectedDay;

    private final char status;

    private final LocalDateTime createAt;

    private final LocalDateTime updateAt;

    public ApplicantsResponse(Applicants applicants) {
        this.id = applicants.getId();
        this.userId = applicants.getUsers().getId();
        this.volunteerId = applicants.getVolunteer().getId();
        this.selectedDay = applicants.getSelectedDay();
        this.status = applicants.getStatus();
        this.createAt = applicants.getCreateAt();
        this.updateAt = applicants.getUpdateAt();
    }
}
