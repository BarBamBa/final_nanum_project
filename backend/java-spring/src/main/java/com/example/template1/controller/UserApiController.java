package com.example.template1.controller;


import com.example.template1.model.Board;
import com.example.template1.model.Users;
import com.example.template1.model.dto.*;
import com.example.template1.model.enums.Authority;
import com.example.template1.repository.UsersRepository;
import com.example.template1.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.el.parser.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class UserApiController {

    private final UserService userService;
    private UsersRepository usersRepository;



    @PostMapping("/signup")
    public String signUp(@RequestBody UsersDto usersDto){
        System.out.println(usersDto.getEmail());

        usersDto.setAuthority(Authority.ROLE_USER);

        return "" + userService.saveUser(usersDto);
    }


    //======= 닉네임 중복검사 ==========================================
    @GetMapping("/check-nickname/{nickname}")
    public ResponseEntity<Map<String, Boolean>> checkNicknameAvailability(@PathVariable String nickname) {
        boolean isAvailable = userService.isNicknameAvailable(nickname);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isAvailable", isAvailable);
        return ResponseEntity.ok(response);
    }


    //======= 이메일 중복검사 ==========================================
    @GetMapping("/check-email/{email}")
    public ResponseEntity<Map<String, Boolean>> checkEmailAvailability(@PathVariable String email) {
        boolean isEmailAvailable = userService.isEmailAvailable(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isEmailAvailable", isEmailAvailable);
        return ResponseEntity.ok(response);
    }


    //======= 로그인 ==========================================

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsersRequsetDto usersRequsetDto) {
        TokenInfo tokenInfo = userService.login(usersRequsetDto.getEmail(), usersRequsetDto.getPassword());

        if (tokenInfo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        } else {
            return ResponseEntity.ok(tokenInfo); // 토큰 정보 반환
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }

    //유저 정보 조회
    @GetMapping("/user/me")
    public ResponseEntity<UsersDto> getMyUserInfo() {
        System.out.println(">>>>>>>>>>>>>user/me");
        UsersDto myInfoBySecurity = userService.getMyInfoBySecurity();
        return ResponseEntity.ok(myInfoBySecurity);
    }


    // 아이디찾기
    @PostMapping("/find-email")
    public ResponseEntity<Map<String, String>> findEmail(@RequestBody UsersDto usersDto) {
        String foundEmail = userService.findEmailByNameAndPhone(usersDto.getName(), usersDto.getPhone());

        if (foundEmail != null) {
            Map<String, String> response = new HashMap<>();
            response.put("foundEmail", foundEmail);
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "일치하는 정보를 찾을 수 없습니다.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

}
