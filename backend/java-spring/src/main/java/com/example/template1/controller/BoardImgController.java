package com.example.template1.controller;


import com.example.template1.model.Board;
import com.example.template1.model.BoardImg;
import com.example.template1.model.Users;
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

//    @Value("${file.dir}")
//    private String fileDir;

    @PostMapping("/board/file/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("boardId") int id) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("업로드할 파일이 없습니다.");
        }

        try {
            // 원래 파일 이름 추출
            String originalFilename = file.getOriginalFilename();
            // 저장할 파일 이름 생성
            String saveFileName = generateSaveFileName(originalFilename);

            // 파일을 저장할 경로 설정
            String uploadPath = "D:/" + saveFileName; // 저장 경로 아직 미정

            // 파일 저장 및 DB에 저장할 이미지 정보 생성

            Board board2 = new Board();

            board2.setId((long) id);

            Users users2 = new Users();
            users2.setId(1L); // 임시로 user_id 1로 지정

            BoardImg boardImg = BoardImg.builder()
                    .path(uploadPath)
                    .name(saveFileName)
                    .board(board2)
                    .users(users2)
                    .build();

            // 필요한 경우 다른 속성도 설정

            // 이미지 정보를 DB에 저장하는 dao 실행
            boardImgService.saveBoardImage(boardImg);

            // 실제로 저장할 파일 이름으로 로컬에 저장
            file.transferTo(new File(uploadPath));


            return ResponseEntity.ok("파일 업로드 및 저장 성공");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패: " + e.getMessage());
        }
    }

    private String generateSaveFileName(String originalFilename) {
        // 현재 시간으로 파일 이름 생성
        long currentTimeMillis = System.currentTimeMillis();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        return currentTimeMillis + extension;
    }
}