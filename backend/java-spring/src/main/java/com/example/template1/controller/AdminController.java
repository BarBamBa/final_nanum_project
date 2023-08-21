package com.example.template1.controller;

import com.example.template1.model.Board;
import com.example.template1.model.dto.BoardRequest;
import com.example.template1.model.dto.BoardResponse;
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

    @PutMapping("/boards/delete")
    public ResponseEntity<List<Board>> deleteBoards(@RequestBody List<BoardRequest> request) {
        List<Board> deleteList = adminService.deleteBoard(request);

        return ResponseEntity.ok()
                .body(deleteList);
    }

}
