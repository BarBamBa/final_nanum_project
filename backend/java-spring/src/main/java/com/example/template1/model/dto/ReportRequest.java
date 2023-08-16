package com.example.template1.model.dto;

import com.example.template1.model.Board;
import com.example.template1.model.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReportRequest {
    private Long id;

    private Long users;

    private Long reporter;

    private Long board;

    private String reason;

}
