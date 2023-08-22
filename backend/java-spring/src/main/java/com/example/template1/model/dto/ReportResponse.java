package com.example.template1.model.dto;

import com.example.template1.model.Board;
import com.example.template1.model.Report;
import com.example.template1.model.Users;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class ReportResponse {
    private final Long id;

    private final Long reportedId;

    private final Long reporterId;

    private final Long boardId;

    private final String reason;

    private final LocalDateTime createAt;

    private final LocalDate createAt2;

    private final LocalDateTime updateAt;

    public ReportResponse(Report report) {
        this.id = report.getId();
        this.reportedId = report.getUsers().getId();
        this.reporterId = report.getUsers().getId();
        this.boardId = report.getBoard().getId();
        this.reason = report.getReason();
        this.createAt = report.getCreateAt();
        this.createAt2 = LocalDate.from(report.getCreateAt());
        this.updateAt = report.getUpdateAt();

    }
}
