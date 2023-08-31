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

    private final int volunteerNumber;

    private final int selectedStartTime;

    private final int selectedEndTime;

    private final String volunteerTitle;

    private final String category;

    private final LocalDateTime selectedDay;

    private final char status;

    private final LocalDateTime createAt;

    private final LocalDateTime updateAt;

    private final String userName;

    public ApplicantsResponse(Applicants applicants) {
        this.id = applicants.getId();
        this.userId = applicants.getUsers().getId();
        this.volunteerNumber = applicants.getVolunteer().getNumber();
        this.selectedStartTime = applicants.getVolunteer().getStartTime();
        this.selectedEndTime = applicants.getVolunteer().getEndTime();
        this.volunteerId = applicants.getVolunteer().getId();
        this.volunteerTitle = applicants.getVolunteer().getTitle();
        this.category = applicants.getVolunteer().getCategory();
        this.selectedDay = applicants.getSelectedDay();
        this.status = applicants.getStatus();
        this.createAt = applicants.getCreateAt();
        this.updateAt = applicants.getUpdateAt();
        this.userName = applicants.getUsers().getName();
    }
}
