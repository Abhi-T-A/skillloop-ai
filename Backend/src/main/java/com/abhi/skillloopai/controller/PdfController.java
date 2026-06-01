package com.abhi.skillloopai.controller;

import java.util.List;

import com.abhi.skillloopai.dto.PdfQuestionResponse;
import com.abhi.skillloopai.entity.PdfStudySession;
import com.abhi.skillloopai.service.PdfService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/pdf")
public class PdfController {

    private final PdfService pdfService;

    public PdfController(PdfService pdfService) {
        this.pdfService = pdfService;
    }

    @PostMapping("/upload")
    public PdfStudySession uploadPdf(
            @RequestParam("file") MultipartFile file)
            throws Exception {

        return pdfService.uploadPdf(file);
    }

    @GetMapping("/history")
    public List<PdfStudySession> getHistory() {

        return pdfService.getAllPdfs();
    }

    @GetMapping("/{pdfId}")
    public PdfStudySession getPdfById(
            @PathVariable Long pdfId) {

        return pdfService.getPdfById(pdfId);
    }

    @PostMapping("/generate-questions/{pdfId}")
    public PdfQuestionResponse generateQuestions(
            @PathVariable Long pdfId) {

        return pdfService.generateQuestions(pdfId);
    }
}