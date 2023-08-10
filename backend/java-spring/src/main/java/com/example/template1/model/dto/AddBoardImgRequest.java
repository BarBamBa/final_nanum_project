package com.example.template1.model.dto;

import com.example.template1.model.Board;
import com.example.template1.model.BoardImg;
import com.example.template1.model.Users;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddBoardImgRequest {

    private  String path;
    private  String name;
    private  Users userId;
    private  Board boardId;

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
