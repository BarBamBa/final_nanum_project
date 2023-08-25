package com.example.template1.model.dto;

import com.example.template1.model.Reply;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
public class ReplyResponse {
    private final Long id;

    private final Long userId;

    private final Long boardId;

    private final String name;

    private final String content;

    private final char status;

    private final Long reply;

    private final LocalDateTime createAt;

    private final LocalDate createAt2;// yyyy-MM-dd 형태

    private final String createAt3;// yyyy-MM-dd HH:mm:ss ㅎ형태

    private final LocalDateTime updateAt;

    public ReplyResponse(Reply reply) {
        this.id = reply.getId();
        this.userId = reply.getUsers().getId();
        this.name = reply.getUsers().getName();
        this.boardId = reply.getBoard().getId();
        this.content = reply.getContent();
        this.status = reply.getStatus();
        this.createAt = reply.getCreateAt();
        this.createAt2 = LocalDate.from(reply.getCreateAt());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.createAt3 = reply.getCreateAt().format(formatter);
        this.updateAt = reply.getUpdateAt();

        if (reply.getReply() == null) {
            this.reply = null;

        } else {
            this.reply = reply.getReply().getId();
        }

    }

}
