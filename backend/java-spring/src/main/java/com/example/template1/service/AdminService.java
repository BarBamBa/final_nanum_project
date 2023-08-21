package com.example.template1.service;

import com.example.template1.model.dto.BoardRequest;
import com.example.template1.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.template1.model.Board;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final BoardRepository boardRepository;

    public List<Board> getAllBoard() { //게시판 조회
        List<Board> boardList = boardRepository.findAllByOrderByCreateAtDesc();
        return boardList;
    }
    public List<Board> deleteBoard(List<BoardRequest> request) { //게시글 삭제로 전환
        List<Board> deletedBoards = new ArrayList<>();

        for (BoardRequest boardRequest : request) {
            Long id = boardRequest.getId();
            Optional<Board> boardItem = boardRepository.findById(id);

            if (boardItem.isPresent()) {
                Board board = boardItem.get();
                board.setStatus('N');
                deletedBoards.add(boardRepository.save(board));
            }
        }

        return deletedBoards;
    }

    public List<Board> revertBoard(List<BoardRequest> request) { //게시글 복구
        List<Board> revertBoards = new ArrayList<>();

        for (BoardRequest boardRequest : request) {
            Long id = boardRequest.getId();
            Optional<Board> boardItem = boardRepository.findById(id);

            if (boardItem.isPresent()) {
                Board board = boardItem.get();
                board.setStatus('Y');
                revertBoards.add(boardRepository.save(board));
            }
        }

        return revertBoards;
    }
}
