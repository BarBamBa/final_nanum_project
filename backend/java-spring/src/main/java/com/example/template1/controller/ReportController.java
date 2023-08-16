package com.example.template1.controller;

import com.example.template1.model.Report;
import com.example.template1.model.dto.ReportRequest;
import com.example.template1.repository.ReportRepository;
import com.example.template1.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;


    @PostMapping("/report/{id}")
    public ResponseEntity<Report> addReport(@PathVariable long id, @RequestBody ReportRequest request) throws Exception {
        Report saveReport = reportService.saveReport(request, id);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(saveReport);
    }


}
