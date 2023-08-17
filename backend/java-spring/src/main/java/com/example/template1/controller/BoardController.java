package com.example.template1.controller;

import com.example.template1.model.Board;
import com.example.template1.model.Reply;
import com.example.template1.model.dto.*;
import com.example.template1.service.BoardImgService;
import com.example.template1.service.BoardService;
import com.example.template1.service.ReplyService;
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
    private final ReplyService replyService;

    @GetMapping("/boards") //게시판 리스트 조회
    public ResponseEntity<List<BoardResponse>> getAllBoards() {
        List<BoardResponse> boards = boardService.getAllBoard()
                .stream()
                .filter(board -> board.getStatus() == 'Y') //게시글 상태 N은 삭제상태로 설정
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

    @PostMapping("/boards/search") //게시판 검색
    public ResponseEntity<List<BoardResponse>> searchingBoard(@RequestBody BoardRequest request) {
        List<BoardResponse> boards = boardService.searchBoard(request.getTitle(), request.getFlg())
                .stream()
                .filter(board -> board.getStatus() == 'Y')
                .map(BoardResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(boards);
    }

    @PostMapping("/boards/post") //게시판 글쓰기
    public ResponseEntity<Board> addOrUpdateBoard(@RequestBody BoardRequest request) {
        if (request.getId() == null) {
            // id(board)가 null인 경우 글 등록
            Board savedBoard = boardService.saveBoard(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(savedBoard);
        } else {
            // id(board)가 있는 경우 글 수정
            Board updatedBoard = boardService.updateBoard(request);
            return ResponseEntity.ok()
                    .body(updatedBoard);
        }
    }

    @PutMapping("/boards/delete/{id}") // 게시판 삭제
    public ResponseEntity<Board> removeBoard(@PathVariable Long id, @RequestBody BoardRequest request) {

        Board deleteBoard = boardService.deleteBoard(id, request);

    return ResponseEntity.ok()
            .body(deleteBoard);
    }

    @GetMapping("/replies/{id}") //댓글 리스트 조회
    public ResponseEntity<List<ReplyResponse>> getAllReplies(@PathVariable Long id) {
        List<ReplyResponse> replies = replyService.getAllReply(id)
                .stream()
                .filter(reply -> reply.getStatus() == 'Y')
                .map(ReplyResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(replies);
    }

    @GetMapping("/child-replies/{id}") // 대댓글 리스트 조회
    public ResponseEntity<List<ReplyResponse>> getAllChildReplies(@PathVariable Reply id) {
        List<ReplyResponse> replies = replyService.getAllChildReply(id)
                .stream()
                .filter(reply -> reply.getStatus() == 'Y')
                .map(ReplyResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(replies);
    }
    @PostMapping("/replies/post/{id}") //댓글 입력
    public ResponseEntity<Reply> addReply(@PathVariable Long id, @RequestBody ReplyRequest request) {
        Reply savedReply = replyService.saveReply(id, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedReply);

    }

    @PutMapping("/replies/update/{id}") //댓글 수정
    public ResponseEntity<Reply> removeReply(@PathVariable Long id, @RequestBody ReplyRequest request) {

        Reply deleteReply = replyService.deleteOrEditReply(id, request);

        return ResponseEntity.ok()
                .body(deleteReply);
    }
}
