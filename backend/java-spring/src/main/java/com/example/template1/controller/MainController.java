package com.example.template1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/final")
public class MainController {

    @RequestMapping("/")
    public String home() {
        return "MainPage";
    }

}
