package com.example.template1.controller;


import com.example.template1.model.BoardImg;
import com.example.template1.model.dto.AddBoardImgRequest;
import com.example.template1.service.BoardImgService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BoardImgController {

    private final BoardImgService boardImgService;

    @PostMapping("/board/file/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("업로드할 파일이 없습니다.");
        }

        try {
            String originalFilename = file.getOriginalFilename();
            String saveFileName = generateSaveFileName(originalFilename);

            // 파일을 저장할 경로 설정 (여기에서는 예시로 사용됨)
            String uploadPath = "/images/" + saveFileName;

            // 파일 저장 및 DB에 저장할 이미지 정보 생성
            BoardImg boardImg = new BoardImg();
            boardImg.setPath(uploadPath);
            boardImg.setName(saveFileName);
            // 필요한 경우 다른 속성도 설정

            // 이미지 정보를 DB에 저장
            boardImgService.saveBoardImage(boardImg);

            // 파일 저장
            Path filePath = Paths.get(ResourceUtils.getURL(uploadPath).toURI());
            Files.write(filePath, file.getBytes());


            return ResponseEntity.ok("파일 업로드 및 저장 성공");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패: " + e.getMessage());
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    private String generateSaveFileName(String originalFilename) {
        // 파일 이름 생성 로직 구현 (예시로 현재 시간을 이용한 이름 생성)
        long currentTimeMillis = System.currentTimeMillis();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        return currentTimeMillis + extension;
    }
}