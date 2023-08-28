package com.example.template1.model.dto;

import com.example.template1.model.Board;
import com.example.template1.model.BoardImg;
import com.example.template1.model.Reply;
import com.example.template1.model.Report;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
public class BoardResponse {
    private final Long id;

    private final String title;

    private final String content;

    private final char status;

    private final char flg;

    private final LocalDateTime createAt;

    private final LocalDate createAt2;// yyyy-MM-dd 형태

    private final String createAt3;// yyyy-MM-dd HH:mm:ss ㅎ형태

    private final LocalDateTime updateAt;

    private final Long userId;

    private final Long volunteerId;

    private final List<Report> reports;

    private final List<Reply> replies;

    private final List<BoardImg> boardImgs;

    private final char reportYn;

    private final String nick;

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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.createAt3 = board.getCreateAt().format(formatter);
        this.updateAt = board.getUpdateAt();
        this.userId = board.getUsers().getId();
        this.nick = board.getUsers().getNickname();
        this.name = board.getUsers().getName();
        this.likeCount = board.getLikeCount();
        this.reports = board.getReports();
        this.replies = board.getReplies();
        this.boardImgs = board.getBoardImgs();

        if (board.getReports().isEmpty()) {
            this.reportYn = 'N';
        } else { this.reportYn = 'Y';}

        if (board.getVolunteer() == null) {
            this.volunteerId = null;
        } else { this.volunteerId = board.getVolunteer().getId(); }

    }

}