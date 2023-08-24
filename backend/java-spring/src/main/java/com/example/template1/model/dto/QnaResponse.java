package com.example.template1.model.dto;

import com.example.template1.model.QnA;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
public class QnaResponse  {
    private final Long id;

    private final Long userId;

    private final String nickname;

    private final Long managerId;

    private final String uTitle;

    private final String uContent;

    private final String mTitle;

    private final String mContent;

    private final char flg;

    private final char status;

    private final LocalDateTime createAt;

    private final LocalDate createAt2;// yyyy-MM-dd 형태

    private final String createAt3;// yyyy-MM-dd HH:mm:ss ㅎ형태

    private final LocalDateTime updateAt;

    public QnaResponse(QnA qna) {
        this.id = qna.getId();

        if (qna.getUsers() == null) { // FaQ에는 유저가 글을 등록 할 수 없으므로 null필요
            this.userId = null;
            this.nickname = null;
        } else {
            this.userId = qna.getUsers().getId();
            this.nickname = qna.getUsers().getNickname();
        }


        if (qna.getUsers() == null) { // qna 관리자가 답변을 달기전에는 null
            this.managerId = null;
        } else {
            this.managerId = qna.getUsers().getId();
        }

        this.uTitle = qna.getUTitle();
        this.uContent = qna.getUContent();
        this.mTitle = qna.getMContent();
        this.mContent = qna.getMContent();
        this.flg = qna.getFlg();
        this.status = qna.getStatus();
        this.createAt = qna.getCreateAt();
        this.createAt2 = LocalDate.from(qna.getCreateAt());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.createAt3 = qna.getCreateAt().format(formatter);
        this.updateAt = qna.getUpdateAt();

    }
}
