package com.abhi.skillloopai.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abhi.skillloopai.entity.PdfQuestion;
import com.abhi.skillloopai.service.QuestionGenerationService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/pdf/questions")
@Tag(name = "PDF", description = "PDF processing APIs")
public class PdfQuestionController {

    private final QuestionGenerationService service;

    public PdfQuestionController(
            QuestionGenerationService service) {

        this.service = service;
    }

    @PostMapping("/generate/{pdfId}")
    public List<PdfQuestion> generate(
            @PathVariable Long pdfId) {

        return service.generateQuestions(pdfId);
    }

    @GetMapping("/{pdfId}")
    public List<PdfQuestion> getQuestions(
            @PathVariable Long pdfId) {

        return service.getQuestionsByPdf(pdfId);
    }
}