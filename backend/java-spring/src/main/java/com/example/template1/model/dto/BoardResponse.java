package com.example.template1.model.dto;

import com.example.template1.model.Board;
import com.example.template1.model.Users;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class BoardResponse {
    private final Long id;

    private final String title;

    private final String content;

    private final char status;

    private final char boardFlg;

    private final LocalDateTime createAt;

    private final LocalDate createAt2;// 게시판 시간 뺀 날짜 표시용

    private final LocalDateTime updateAt;

    private final Long uId;



    public BoardResponse(Board board) {
        this.id = board.getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.status = board.getStatus();
        this.boardFlg = board.getBoardFlg();
        this.createAt = board.getCreateAt();
        this.createAt2 = LocalDate.from(board.getCreateAt());
        this.updateAt = board.getUpdateAt();
        this.uId = board.getUsers().getId();
    }
}
