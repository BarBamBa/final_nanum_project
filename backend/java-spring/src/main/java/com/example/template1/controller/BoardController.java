package com.example.template1.controller;

import com.example.template1.model.Board;
import com.example.template1.model.dto.AddBoardRequest;
import com.example.template1.model.dto.BoardResponse;
import com.example.template1.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/boards") //게시판 리스트 조회
    public ResponseEntity<List<BoardResponse>> getAllBoard() {
        List<BoardResponse> boards = boardService.getAllBoard()
                .stream()
                .map(BoardResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(boards);
    }

    @GetMapping("/boards/{id}") //게시판 글 보기
    public ResponseEntity<BoardResponse> findArticle(@PathVariable long id){
        Board board = boardService.getBoardDetail(id);

        return ResponseEntity.ok()
                .body(new BoardResponse(board));
    }

    @PostMapping("/boards/put")
    public ResponseEntity<Board> addBoard(@RequestBody AddBoardRequest request) {
        Board savedBoard = boardService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedBoard);
    }


}
