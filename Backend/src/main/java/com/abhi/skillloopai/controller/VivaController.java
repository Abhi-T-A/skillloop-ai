package com.abhi.skillloopai.controller;

import java.util.List;

import com.abhi.skillloopai.dto.PerformanceSummaryDTO;
import com.abhi.skillloopai.dto.VivaAnswerRequest;
import com.abhi.skillloopai.entity.VivaResult;
import com.abhi.skillloopai.service.VivaService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/viva")
public class VivaController {

    private final VivaService vivaService;

    public VivaController(VivaService vivaService) {
        this.vivaService = vivaService;
    }

    @PostMapping("/evaluate")
    public VivaResult evaluateAnswer(
            @RequestBody VivaAnswerRequest request) {

        return vivaService.evaluate(request);
    }

    @GetMapping("/history")
    public List<VivaResult> getHistory() {
        return vivaService.getAllResults();
    }

    @GetMapping("/analytics")
    public PerformanceSummaryDTO getAnalytics() {
        return vivaService.getAnalytics();
    }
}