package com.example.template1.model.dto;

import com.example.template1.model.Board;
import com.example.template1.model.BoardImg;
import com.example.template1.model.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Collections;

@Getter
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class AddBoardRequest {

    private final String title;
    private final String content;
    private final char flg;

    public Board toBoardEntity() {
        Users users = new Users();
        users.setId(1L);

        return Board.builder()
                .title(title)
                .content(content)
                .flg(flg)
                .status('Y')
                .users(users)
                .build();

    }

}
