package com.example.template1.model.dto;

import com.example.template1.model.Reply;
import lombok.Getter;

@Getter
public class ReplyResponse {
    private final Long id;

    private final Long userId;

    private final Long boardId;

    private final String name;

    private final String content;

    private final Long reply;

    private final char status;

    public ReplyResponse(Reply reply) {
        this.id = reply.getId();
        this.userId = reply.getUsers().getId();
        this.name = reply.getUsers().getName();
        this.boardId = reply.getBoard().getId();
        this.content = reply.getContent();
        this.reply = reply.getReply();
        this.status = reply.getStatus();

    }

}
