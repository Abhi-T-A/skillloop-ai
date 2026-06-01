package com.abhi.skillloopai.controller;

import com.abhi.skillloopai.service.HuggingFaceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final HuggingFaceService huggingFaceService;

    public TestController(HuggingFaceService huggingFaceService) {
        this.huggingFaceService = huggingFaceService;
    }

    @GetMapping
    public String test() {
        return "SkillLoop AI Backend Running";
    }

    @GetMapping("/hf")
    public String testHF() {

        return huggingFaceService.generateQuestions(
                "Spring Boot is a Java framework used to build REST APIs."
        );
    }
}