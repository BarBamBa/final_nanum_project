package com.example.template1.service;

import com.example.template1.model.Board;
import com.example.template1.model.Report;
import com.example.template1.model.Users;
import com.example.template1.model.dto.ReportRequest;
import com.example.template1.repository.ReportRepository;
import com.nimbusds.jose.shaded.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;

    public Report saveReport(ReportRequest request, long id) throws Exception {
        // 중복 신고 방지 유효성검사
        boolean DuplicateTest =reportRepository.existsByReporterIdAndBoardId(request.getReporter(), id);

        if (DuplicateTest) {
            throw new Exception("이미 신고한 게시물입니다.");
        }

        Users users = new Users();
        users.setId(request.getUsers());

        Users reporter = new Users();
        reporter.setId(request.getReporter());

        Board board = new Board();
        board.setId(id);

        Report report = Report.builder()
                .id(request.getId())
                .users(users)
                .reporter(reporter)
                .board(board)
                .reason(request.getReason())
                .build();
        return reportRepository.save(report);
    }
}
