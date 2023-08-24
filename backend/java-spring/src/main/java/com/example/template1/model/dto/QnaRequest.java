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

    private Users userId;

    private Users managerId;

    private String uTitle;

    private String uContent;

    private String mTitle;

    private String mContent;

    private char flg;

    private char status = 'Y';

}
