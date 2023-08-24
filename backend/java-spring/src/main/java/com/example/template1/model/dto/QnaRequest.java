package com.example.template1.model.dto;

import com.example.template1.model.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QnaRequest {

    private Long id;

    private Long userId;

    private String title;

    private String content;

    private Long parentNo;

    private char flg;

    private char status = 'Y';

}
