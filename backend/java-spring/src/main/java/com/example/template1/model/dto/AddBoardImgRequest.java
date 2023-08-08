package com.example.template1.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class AddBoardImgRequest {

    private Long boardId;
    private String path;
    private String name;
}
