package com.example.template1.controller;

import com.example.template1.model.Board;
import com.example.template1.model.dto.BoardResponse;
import com.example.template1.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/boards")
    public ResponseEntity<List<BoardResponse>> getAllBoard() {
        List<BoardResponse> boards = boardService.getAllBoard()
                .stream()
                .map(BoardResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(boards);
    }

    @GetMapping("/boards/{id}")
    public ResponseEntity<BoardResponse> findArticle(@PathVariable long id){
        Board board = boardService.getBoardDetail(id);

        return ResponseEntity.ok()
                .body(new BoardResponse(board));
    }


}
