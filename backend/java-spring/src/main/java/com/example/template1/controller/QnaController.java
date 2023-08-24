package com.example.template1.controller;

import com.example.template1.model.QnA;
import com.example.template1.model.dto.BoardResponse;
import com.example.template1.model.dto.QnaRequest;
import com.example.template1.model.dto.QnaResponse;
import com.example.template1.service.QnaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class QnaController {
    private final QnaService qnaService;

    @GetMapping("/qna")
    public ResponseEntity<List<QnaResponse>> findAllQna() {
        List<QnaResponse> qnaList = qnaService.getAllQna()
                .stream()
                .filter(qna -> qna.getStatus() == 'Y')
                .filter(qna -> qna.getQna() == null)
                .map(QnaResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(qnaList);
    }

    @GetMapping("/qna/{id}")
    public ResponseEntity<QnaResponse> findQna(@PathVariable long id) {
        QnA qna = qnaService.getQna(id);
        return ResponseEntity.ok()
                .body(new QnaResponse(qna));
    }

    @PostMapping("/qna/post")
    public ResponseEntity<QnA> addOrUpdateQnA(@RequestBody QnaRequest request) {
        if (request.getId() == null) {
            QnA saveQna = qnaService.saveQna(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(saveQna);
        } else {
            QnA updateQna = qnaService.updateQna(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(updateQna);
        }
    }

    @PostMapping("/qna/post/answer")
    public ResponseEntity<QnA> responseQnA(@RequestBody QnaRequest request) {
        QnA qna = qnaService.replyQnA(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(qna);
    }
}
