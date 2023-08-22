package com.example.template1.controller;

import com.example.template1.model.Board;
import com.example.template1.model.Reply;
import com.example.template1.model.dto.*;
import com.example.template1.service.AdminService;
import com.example.template1.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/boards") //게시판 리스트 조회
    public ResponseEntity<List<BoardResponse>> getAllBoards() {
        List<BoardResponse> boards = adminService.getAllBoard()
                .stream()
                .map(BoardResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(boards);
    }

    @PostMapping("/boards/reported") // id로 게시판 신고 내역 리스트 조회
    public ResponseEntity<List<ReportResponse>> getAllReports(@RequestBody ReportRequest request) {
        List<ReportResponse> reports = adminService.getAllReport(request.getBoard())
                .stream()
                .map(ReportResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(reports);
    }

    @PutMapping("/boards/delete") //게시글 삭제
    public ResponseEntity<List<Board>> deleteBoards(@RequestBody List<BoardRequest> request) {
        List<Board> deleteList = adminService.deleteBoard(request);

        return ResponseEntity.ok()
                .body(deleteList);
    }

    @PutMapping("/boards/revert") //게시글 복구
    public ResponseEntity<List<Board>> revertBoards(@RequestBody List<BoardRequest> request) {
        List<Board> revertList = adminService.revertBoard(request);

        return ResponseEntity.ok()
                .body(revertList);
    }

    @PostMapping("/boards/category") //게시글 카테고리로 조회
    public ResponseEntity<List<BoardResponse>> getBoardsByCategory(@RequestBody BoardRequest request) {
        List<BoardResponse> boardList = adminService.getBoardByCategory(request.getFlg())
                .stream()
                .map(BoardResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(boardList);
    }

    @PutMapping("/reply/delete") //댓글 삭제
    public ResponseEntity<List<Reply>> deleteReplies(@RequestBody List<ReplyRequest> request) {
        List<Reply> deleteList = adminService.deleteReply(request);

        return ResponseEntity.ok()
                .body(deleteList);
    }

    @PutMapping("/reply/revert") //댓글 삭제
    public ResponseEntity<List<Reply>> revertReplies(@RequestBody List<ReplyRequest> request) {
        List<Reply> revertList = adminService.revertReply(request);

        return ResponseEntity.ok()
                .body(revertList);
    }
}
