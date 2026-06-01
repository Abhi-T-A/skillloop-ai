package com.abhi.skillloopai.controller;

import com.abhi.skillloopai.entity.PdfQuestion;
import com.abhi.skillloopai.service.QuestionGenerationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pdf/questions")
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