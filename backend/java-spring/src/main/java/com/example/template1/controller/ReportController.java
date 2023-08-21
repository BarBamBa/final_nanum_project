package com.example.template1.controller;

import com.example.template1.model.Report;
import com.example.template1.model.dto.ReportRequest;
import com.example.template1.repository.ReportRepository;
import com.example.template1.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;


    @PostMapping("/report/{id}")
    public ResponseEntity<Object> addReport(@PathVariable long id, @RequestBody ReportRequest request) throws Exception {
        if (reportService.DuplicateTest(request, id)) {
            Boolean duplicate = reportService.DuplicateTest(request, id);
            return ResponseEntity.ok(duplicate);
        }

        Report saveReport = reportService.saveReport(request, id);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(saveReport);
    }


}
