package com.example.template1.controller;

import com.example.template1.model.dto.BoardResponse;
import com.example.template1.model.dto.QnaResponse;
import com.example.template1.service.QnaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class QnaController {
    private final QnaService qnaService;

    @GetMapping("/qna")
    public ResponseEntity<List<QnaResponse>> getAllQnas() {
        List<QnaResponse> qnaList = qnaService.getAllQna()
                .stream()
                .filter(qna -> qna.getStatus() == 'Y')
                .map(QnaResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(qnaList);
    }
}
