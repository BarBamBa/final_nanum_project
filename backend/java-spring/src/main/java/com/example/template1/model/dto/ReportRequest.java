package com.example.template1.model.dto;

import com.example.template1.model.Board;
import com.example.template1.model.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReportRequest {
    private Long id;

    private Long users; // 게시물 게시자

    private Long reporter; //신고하는 유저

    private Long board; //신고 게시물

    private String reason;


}
