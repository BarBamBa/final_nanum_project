package com.example.template1.controller;

import com.example.template1.service.RemoteApiService;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class MainController {

    private final RemoteApiService remoteApiService;

    @GetMapping("/")
    public String home() { return "Test"; }

}
