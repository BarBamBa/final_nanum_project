package com.example.template1.service;

import com.example.template1.model.Board;
import com.example.template1.model.Reply;
import com.example.template1.model.Users;
import com.example.template1.model.dto.BoardDeleteRequest;
import com.example.template1.model.dto.BoardRequest;
import com.example.template1.repository.BoardRepository;
import com.example.template1.repository.ReplyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public List<Board> getAllBoard() {
        List<Board> boardList = boardRepository.findAll();
        return boardList;
    }

    public Board getBoardDetail(long id) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        return board;
    }

    public Board saveBoard(BoardRequest request) {
        Users users = new Users();
        users.setId(request.getUsers().getId());

        Board board =  Board.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .flg(request.getFlg())
                .status('Y')
                .users(users)
                .build();

        return boardRepository.save(board);
    }

    @Transactional
    public Board updateBoard(BoardRequest request) {
        Board board = boardRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("not found : " + request.getId()));

        board.setTitle(request.getTitle());
        board.setContent(request.getContent());

        return board;
    }
    @Transactional
    public Board deleteBoard(long id, BoardRequest request) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        board.delete(request.getStatus());
        return board;
    }



}