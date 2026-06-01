package com.abhi.skillloopai.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abhi.skillloopai.dto.PdfVivaStartResponse;
import com.abhi.skillloopai.dto.PerformanceSummaryDTO;
import com.abhi.skillloopai.dto.VivaAnswerRequest;
import com.abhi.skillloopai.entity.VivaResult;
import com.abhi.skillloopai.service.VivaService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/viva")
@Tag(name = "Viva", description = "Viva APIs")
public class VivaController {

    private final VivaService vivaService;

    public VivaController(VivaService vivaService) {
        this.vivaService = vivaService;
    }

    @PostMapping("/evaluate")
    public VivaResult evaluateAnswer(
            @jakarta.validation.Valid @RequestBody VivaAnswerRequest request) {

        return vivaService.evaluate(request);
    }

    @GetMapping("/history")
    public List<VivaResult> getHistory() {
        return vivaService.getAllResults();
    }

    @GetMapping("/start/{pdfId}")
    public PdfVivaStartResponse startPdfViva(
            @PathVariable Long pdfId) {

        return vivaService.startPdfViva(pdfId);
    }

    @GetMapping("/analytics")
    public PerformanceSummaryDTO getAnalytics() {
        return vivaService.getAnalytics();
    }
}