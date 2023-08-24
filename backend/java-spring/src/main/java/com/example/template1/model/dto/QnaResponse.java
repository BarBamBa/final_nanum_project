package com.example.template1.model.dto;

import com.example.template1.model.QnA;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
public class QnaResponse  {
    private final Long id;

    private final Long userId;

    private final String nickname;

    private final String title;

    private final String content;

    private final Long parentNo;

    private final List<QnA> answers;

    private final char flg;

    private final char status;

    private final LocalDateTime createAt;

    private final LocalDate createAt2;// yyyy-MM-dd 형태

    private final String createAt3;// yyyy-MM-dd HH:mm:ss ㅎ형태

    private final LocalDateTime updateAt;

    public QnaResponse(QnA qna) {
        this.id = qna.getId();
        this.userId = qna.getUsers().getId();
        this.nickname = qna.getUsers().getNickname();
        this.title = qna.getTitle();
        this.content = qna.getContent();
        this.answers = qna.getAnswers();
        this.flg = qna.getFlg();
        this.status = qna.getStatus();
        this.createAt = qna.getCreateAt();
        this.createAt2 = LocalDate.from(qna.getCreateAt());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.createAt3 = qna.getCreateAt().format(formatter);
        this.updateAt = qna.getUpdateAt();

        if(qna.getQna() == null) {
            this.parentNo = null;
        } else {
            this.parentNo = qna.getQna().getId();
        }

    }
}
