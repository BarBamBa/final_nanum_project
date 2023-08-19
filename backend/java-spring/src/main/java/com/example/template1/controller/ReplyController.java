package com.example.template1.controller;

import com.example.template1.model.Reply;
import com.example.template1.model.dto.ReplyRequest;
import com.example.template1.model.dto.ReplyResponse;
import com.example.template1.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReplyController {
    private final ReplyService replyService;

    @GetMapping("/replies/{id}") //댓글 리스트 조회
    public ResponseEntity<List<ReplyResponse>> getAllReplies(@PathVariable Long id) {
        List<ReplyResponse> replies = replyService.getAllReply(id)
                .stream()
                .filter(reply -> reply.getStatus() == 'Y')
                .map(ReplyResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(replies);
    }

    @GetMapping("/child-replies/{id}") // 대댓글 리스트 조회
    public ResponseEntity<List<ReplyResponse>> getAllChildReplies(@PathVariable Reply id) {
        List<ReplyResponse> replies = replyService.getAllChildReply(id)
                .stream()
                .filter(reply -> reply.getStatus() == 'Y')
                .map(ReplyResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(replies);
    }
    @PostMapping("/replies/post/{id}") //댓글 입력
    public ResponseEntity<Reply> addReply(@PathVariable Long id, @RequestBody ReplyRequest request) {
        Reply savedReply = replyService.saveReply(id, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedReply);

    }

    @PutMapping("/replies/update/{id}") //댓글 수정
    public ResponseEntity<Reply> removeReply(@PathVariable Long id, @RequestBody ReplyRequest request) {

        Reply deleteReply = replyService.deleteOrEditReply(id, request);

        return ResponseEntity.ok()
                .body(deleteReply);
    }
}
