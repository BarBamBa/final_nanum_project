package com.example.template1.service;

import com.example.template1.model.Board;
import com.example.template1.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public List<Board> getAllBoard() {
        List<Board> boardList = boardRepository.findAllWithUsers();
        return boardList;
    }

    public Board getBoardDetail(long id) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        return board;
    }

}
