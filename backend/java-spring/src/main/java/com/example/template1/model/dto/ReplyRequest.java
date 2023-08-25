package com.example.template1.model.dto;

import com.example.template1.model.Reply;
import jakarta.annotation.Nullable;
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

    private Long id;

    private String content;

    private char status = 'Y';

    private Long parentNo;

    private Long userId;

    private Long boardId;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

}
