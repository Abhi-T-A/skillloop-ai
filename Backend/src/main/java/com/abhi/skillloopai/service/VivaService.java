package com.abhi.skillloopai.service;

import java.util.List;

import com.abhi.skillloopai.dto.PerformanceSummaryDTO;
import com.abhi.skillloopai.dto.VivaAnswerRequest;
import com.abhi.skillloopai.entity.VivaResult;
import com.abhi.skillloopai.repository.VivaResultRepository;
import org.springframework.stereotype.Service;

@Service
public class VivaService {

    private final VivaResultRepository repository;

    public VivaService(VivaResultRepository repository) {
        this.repository = repository;
    }

    public List<VivaResult> getAllResults() {
        return repository.findAll();
    }

    public VivaResult evaluate(VivaAnswerRequest request) {

        int score;

        if (request.getUserAnswer().length() > 20) {
            score = 90;
        } else {
            score = 50;
        }

        String feedback =
                score >= 80
                        ? "Good Answer"
                        : "Need More Explanation";

        VivaResult result = new VivaResult(
                request.getTopic(),
                request.getQuestion(),
                request.getUserAnswer(),
                score,
                feedback
        );

        return repository.save(result);
    }

    public PerformanceSummaryDTO getAnalytics() {

        List<VivaResult> results = repository.findAll();

        long totalAttempts = results.size();

        double averageScore = results.stream()
                .mapToInt(VivaResult::getScore)
                .average()
                .orElse(0);

        int highestScore = results.stream()
                .mapToInt(VivaResult::getScore)
                .max()
                .orElse(0);

        int lowestScore = results.stream()
                .mapToInt(VivaResult::getScore)
                .min()
                .orElse(0);

        return new PerformanceSummaryDTO(
                totalAttempts,
                averageScore,
                highestScore,
                lowestScore
        );
    }
}