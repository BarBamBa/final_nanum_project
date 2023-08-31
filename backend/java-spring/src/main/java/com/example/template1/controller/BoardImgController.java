package com.example.template1.controller;


import com.example.template1.model.Board;
import com.example.template1.model.BoardImg;
import com.example.template1.model.Users;
import com.example.template1.model.dto.BoardImgRequest;
import com.example.template1.model.dto.BoardRequest;
import com.example.template1.service.BoardImgService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import java.util.Arrays;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BoardImgController {

    private final BoardImgService boardImgService;

//    @Value("${file.dir}")
//    private String fileDir;

    @PostMapping("/board/file/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("boardId") long boardId, @RequestParam("userId") long userId) throws IOException {
        String imagePath = Paths.get("").toAbsolutePath() + "\\backend\\java-spring\\src\\main\\resources\\images";
//        String imagePath = Paths.get("").toAbsolutePath() + "\\backend\\java-spring\\build\\resources\\main\\images";
        System.out.println(">>>>>>>>>>>>>>>>>>>>>" +imagePath);

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("업로드할 파일이 없습니다.");
        }

        try {
            // 원래 파일 이름 추출
            String originalFilename = file.getOriginalFilename();
            // 저장할 파일 이름 생성
            String saveFileName = generateSaveFileName(originalFilename);

            // 파일을 저장할 경로 설정
            String uploadPath =  imagePath + "\\" + saveFileName;

            // 파일 저장 및 DB에 저장할 이미지 정보 생성

            Board board = new Board();
            board.setId(boardId);

            Users users = new Users();
            users.setId(userId);

            BoardImg boardImg = BoardImg.builder()
                    .path(uploadPath)
                    .name(saveFileName)
                    .board(board)
                    .users(users)
                    .status('Y')
                    .build();

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

    @GetMapping("/image/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
        // 이미지 파일 경로 설정
        String imagePath = Paths.get("").toAbsolutePath() + "\\backend\\java-spring\\src\\main\\resources\\images\\" + imageName;

//        String imagePath = "images/" + imageName;
//        //ClassPathResource : build 폴더를 상대경로로잡아 서버 재시작해야 재대로 로드됨
//        ClassPathResource resource = new ClassPathResource(imagePath);
//        byte[] imageBytes = Files.readAllBytes(Path.of(resource.getURI()));

        // 이미지 파일을 ClassPathResource(프로젝트 내 상대경로)를 통해 가져오고 byte 배열로 변환
        byte[] imageBytes = Files.readAllBytes(Path.of(imagePath));

        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>" + imagePath);
        // 이미지 파일의 MIME 타입 설정
        MediaType mediaType = MediaType.IMAGE_PNG; // 이미지타입 저장

        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(imageBytes);
    }

    @PostMapping("/img/remove") // 게시판 삭제
    public ResponseEntity<BoardImg> removeImg(@RequestBody BoardImgRequest request) {

        BoardImg img = boardImgService.deleteImg(request.getId());

        return ResponseEntity.ok()
                .body(img);
    }
}