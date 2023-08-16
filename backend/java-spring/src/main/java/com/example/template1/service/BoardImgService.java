package com.example.template1.service;

import com.example.template1.model.BoardImg;
import com.example.template1.repository.BoardImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardImgService {
    private final BoardImgRepository boardImgRepository;

    public BoardImg saveBoardImage(BoardImg boardImg) {
        return boardImgRepository.save(boardImg);
    }
}
