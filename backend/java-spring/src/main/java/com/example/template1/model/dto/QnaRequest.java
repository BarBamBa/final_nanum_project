package com.example.template1.model.dto;

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

    private Long managerId;

    private String UTitle;

    private String UContent;

    private String MTitle;

    private String MContent;

    private char flg;

    private char status = 'Y';

}
