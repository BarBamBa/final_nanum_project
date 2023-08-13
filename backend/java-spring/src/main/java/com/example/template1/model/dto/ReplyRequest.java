package com.example.template1.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReplyRequest {

    private String content;

    private Long reply;

    private char status;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;
}
