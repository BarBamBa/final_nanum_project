package com.example.template1.controller;

import com.example.template1.model.Board;
import com.example.template1.model.dto.BoardDeleteRequest;
import com.example.template1.model.dto.BoardRequest;
import com.example.template1.model.dto.BoardResponse;
import com.example.template1.model.dto.ReplyResponse;
import com.example.template1.service.BoardImgService;
import com.example.template1.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private final BoardImgService boardImgService;

    @GetMapping("/boards") //게시판 리스트 조회
    public ResponseEntity<List<BoardResponse>> getAllBoards() {
        List<BoardResponse> boards = boardService.getAllBoard()
                .stream()
                .filter(board -> board.getStatus() == 'Y') //게시글 상태 N은 삭제상태로 설정
                //board.getStatus().equals("Y") 는 문자열 비교라 char인 status컬럼은 equals 사용 불가
                .map(BoardResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(boards);
    }

    @GetMapping("/boards/{id}") //게시판 글 보기
    public ResponseEntity<BoardResponse> findBoard(@PathVariable long id){
        Board board = boardService.getBoardDetail(id);

        return ResponseEntity.ok()
                .body(new BoardResponse(board));
    }

    @PostMapping("/boards/post") //게시판 글쓰기
    public ResponseEntity<Board> addBoard(@RequestBody BoardRequest request) {
        Board savedBoard = boardService.saveBoard(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedBoard);
    }

    @PutMapping("/boards/delete/{id}")
    public ResponseEntity<Board> removeBoard(@PathVariable Long id, @RequestBody BoardRequest request) {

        Board deleteBoard = boardService.deleteBoard(id, request);

    return ResponseEntity.ok()
            .body(deleteBoard);
    }

    @GetMapping("/replies/{id}") //댓글 리스트 조회
    public ResponseEntity<List<ReplyResponse>> getAllReplies(@PathVariable Long id) {
        List<ReplyResponse> replies = boardService.getAllReply(id)
                .stream()
                .filter(reply -> reply.getStatus() == 'Y')
                .filter(reply -> Objects.equals(reply.getBoard().getId(), id))
                .map(ReplyResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(replies);
    }

}
