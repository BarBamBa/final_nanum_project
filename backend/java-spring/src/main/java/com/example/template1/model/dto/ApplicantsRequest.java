package com.example.template1.model.dto;

import com.example.template1.model.Users;
import com.example.template1.model.Volunteer;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicantsRequest {
    private Long id;

    private Users users;

    private Volunteer volunteer;

    private LocalDateTime selectedDay;

    private char status = 'Y';

    private LocalDateTime createAt;

    private LocalDateTime updateAt;
}
