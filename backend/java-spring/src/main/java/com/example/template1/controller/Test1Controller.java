package com.example.template1.controller;

import com.example.template1.service.RemoteApiService;
import com.example.template1.service.RemoteApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/test1")
@RequiredArgsConstructor
public class Test1Controller {

    private final RemoteApiService remoteApiService;

    private final RemoteApiService remoteApiService;

    @GetMapping("/gettest1")
    public String gettest1() {
        return "get테스트1";
    }
}
