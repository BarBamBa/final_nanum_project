package com.example.template1.service;

import com.example.template1.model.Board;
import com.example.template1.model.Report;
import com.example.template1.model.Users;
import com.example.template1.model.dto.ReportRequest;
import com.example.template1.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    public Report saveReport(ReportRequest request, long id) throws Exception {

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


    public boolean DuplicateTest(ReportRequest request, long id) { //중복신고 검사

        return reportRepository.existsByReporterIdAndBoardId(request.getReporter(), id);
    }

}
