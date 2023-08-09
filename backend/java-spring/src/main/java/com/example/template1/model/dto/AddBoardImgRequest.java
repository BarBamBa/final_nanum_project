package com.example.template1.model.dto;

import com.example.template1.model.Board;
import com.example.template1.model.BoardImg;
import com.example.template1.model.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class AddBoardImgRequest {

    private final String path;
    private final String name;
    private final Users userId;
    private final Board boardId;

    public BoardImg uploadImgEntity() {
        Users users = new Users();
        return BoardImg.builder()
                .path(path)
                .name(name)
                .users(userId)
                .board(boardId)
                .build();

    }
}
