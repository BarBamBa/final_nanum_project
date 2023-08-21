package com.example.template1.controller;

import com.example.template1.model.Users;
import com.example.template1.model.dto.UsersDto;
import com.example.template1.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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




    @PostMapping("/signup")
    public String signUp(@RequestBody UsersDto usersDto){
        System.out.println(usersDto.getEmail());
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
    public Users login(@RequestBody final UsersDto params){
        Users entity = userService.findBy(params);
        return entity;
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }



}
