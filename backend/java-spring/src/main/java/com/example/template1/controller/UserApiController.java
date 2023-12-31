package com.example.template1.controller;


import com.example.template1.config.jwt.JwtTokenDto;
import com.example.template1.model.Users;
import com.example.template1.model.dto.*;
import com.example.template1.model.enums.Authority;
import com.example.template1.repository.UsersRepository;
import com.example.template1.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class UserApiController {

    private final UserService userService;
    private final UsersRepository usersRepository;

    private UsersRequsetDto usersRequsetDto;


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

        Users users = usersRepository.findByEmail(usersRequsetDto.getEmail());
        if(users.getStatus() == 'N') {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("차단계정");
        }

        JwtTokenDto jwtTokenDto = userService.login(usersRequsetDto.getEmail(), usersRequsetDto.getPassword());



        if (jwtTokenDto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        } else {
            return ResponseEntity.ok(jwtTokenDto); // 토큰 정보 반환
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

    //======= 유저 정보 업데이트 ========================================
    @PutMapping("/user/update")
    public ResponseEntity<String> updateUser(@RequestBody UsersDto usersDto) {
        try {
            userService.updateUser(usersDto);
            return ResponseEntity.ok("사용자 정보가 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("사용자 정보 업데이트에 실패했습니다.");
        }
    }

    //======= 유저 비밀번호 업데이트 ========================================
    @PutMapping("/user/passwordUpdate")
    public ResponseEntity<String> changePassword(@RequestBody UsersRequsetDto usersRequsetDto) {
        try {
            userService.changePassword(usersRequsetDto.getEmail(), usersRequsetDto.getPassword());
            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("비밀번호 변경에 실패했습니다.");
        }
    }


    // 아이디찾기
    @PostMapping("/id")
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
