package com.example.template1.service;

import com.example.template1.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.template1.model.Board;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final BoardRepository boardRepository;

    public List<Board> getAllBoard() {
        List<Board> boardList = boardRepository.findAll();
        return boardList;
    }
}
