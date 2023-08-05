package com.example.template1.controller;

import com.example.template1.model.Board;
import com.example.template1.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BoardController {

    @Autowired
    BoardService boardService;

    @GetMapping("/boards")
    public List<Board> getAllBoard() throws Exception {
        List<Board> listBoard = boardService.getAllBoard();
        return listBoard;
    }


}
