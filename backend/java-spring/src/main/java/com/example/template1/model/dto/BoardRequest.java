package com.example.template1.model.dto;

import com.example.template1.model.Board;
import com.example.template1.model.Users;
import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardRequest {

    private String title;

    private String content;

    private char flg;

    private char status;


}
