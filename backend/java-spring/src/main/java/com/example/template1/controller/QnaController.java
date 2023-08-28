package com.example.template1.controller;

import com.example.template1.model.Board;
import com.example.template1.model.QnA;
import com.example.template1.model.dto.BoardRequest;
import com.example.template1.model.dto.BoardResponse;
import com.example.template1.model.dto.QnaResponse;
import com.example.template1.service.QnaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class QnaController {
    private final QnaService qnaService;

    @GetMapping("/qna") // qna 리스트
    public ResponseEntity<List<QnaResponse>> findAllQna() {
        List<QnaResponse> qnaList = qnaService.getAllQna()
                .stream()
                .filter(qna -> qna.getStatus() == 'Y')
                .map(QnaResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(qnaList);
    }

    @GetMapping("/qna/{id}") // qna상세글
    public ResponseEntity<QnaResponse> findQna(@PathVariable long id) {
        QnA qna = qnaService.getQna(id);
        return ResponseEntity.ok()
                .body(new QnaResponse(qna));
    }

    @PostMapping("/qna/search") //  qna 검색
    public ResponseEntity<List<QnaResponse>> searchingQna(@RequestBody QnaRequest request) {
        List<QnaResponse> qnaList = qnaService.searchQna(request.getTitle(), request.getFlg())
                .stream()
                .filter(qna -> qna.getStatus() == 'Y')
                .filter(qna -> qna.getQna() == null)
                .map(QnaResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(qnaList);
    }

    @PostMapping("/qna/post") // qna 글쓰기 / 수정
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

    @PutMapping("/qna/delete/{id}") // qna 삭제
    public ResponseEntity<QnA> removeQna(@PathVariable Long id, @RequestBody QnaRequest request) {

        QnA qna = qnaService.deleteQna(id, request);

        return ResponseEntity.ok()
                .body(qna);
    }

    @PostMapping("/qna/post/answer") //qna 답변
    public ResponseEntity<QnA> responseQnA(@RequestBody QnaRequest request) {
        QnA qna = qnaService.replyQnA(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(qna);
    }
}
