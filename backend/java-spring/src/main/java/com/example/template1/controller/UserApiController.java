package com.example.template1.controller;

import com.example.template1.model.dto.UsersDto;
import com.example.template1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserApiController {

    private final UserService userService;

    @PostMapping("/signup")
    public String signUp(@RequestBody UsersDto usersDto){
        System.out.println(usersDto.getEmail());
        return "" + userService.saveUser(usersDto);
    }

}
