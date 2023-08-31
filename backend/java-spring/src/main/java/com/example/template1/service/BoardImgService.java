package com.example.template1.service;

import com.example.template1.model.BoardImg;
import com.example.template1.repository.BoardImgRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardImgService {
    private final BoardImgRepository boardImgRepository;

    public BoardImg saveBoardImage(BoardImg boardImg) {
        return boardImgRepository.save(boardImg);
    }
    @Transactional
    public BoardImg deleteImg(Long id) {
        BoardImg img = boardImgRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        img.setStatus('N');
        return img;
    }
}
