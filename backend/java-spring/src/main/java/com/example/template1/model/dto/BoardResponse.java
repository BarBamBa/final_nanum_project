package com.example.template1.model.dto;

import com.example.template1.model.Board;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class BoardResponse {
    private final Long id;

    private final String title;

    private final String content;

    private final char status;

    private final char flg;

    private final LocalDateTime createAt;

    private final LocalDate createAt2;// 게시판 시간 뺀 날짜 표시용

    private final LocalDateTime updateAt;

    private final Long userId;

    private final String name;

    private final Integer likeCount;


    public BoardResponse(Board board) {
        this.id = board.getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.status = board.getStatus();
        this.flg = board.getFlg();
        this.createAt = board.getCreateAt();
        this.createAt2 = LocalDate.from(board.getCreateAt());
        this.updateAt = board.getUpdateAt();
        this.userId = board.getUsers().getId();
        this.name = board.getUsers().getName();
        this.likeCount = board.getLikeCount();
    }

}
