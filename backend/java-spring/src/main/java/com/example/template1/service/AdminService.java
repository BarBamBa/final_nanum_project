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
    public List<Board> deleteBoard(List<BoardRequest> request) {
        List<Board> deletedBoards = new ArrayList<>();

        for (BoardRequest boardRequest : request) {
            Long id = boardRequest.getId();
            Optional<Board> optionalBoard = boardRepository.findById(id);

            if (optionalBoard.isPresent()) {
                Board board = optionalBoard.get();
                board.setStatus('N'); // 예시로 상태를 "N"으로 변경
                deletedBoards.add(boardRepository.save(board));
            }
        }

        return deletedBoards;
    }
}
