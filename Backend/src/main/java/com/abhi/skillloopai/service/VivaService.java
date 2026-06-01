package com.abhi.skillloopai.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.abhi.skillloopai.dto.PdfVivaStartResponse;
import com.abhi.skillloopai.dto.PerformanceSummaryDTO;
import com.abhi.skillloopai.dto.VivaAnswerRequest;
import com.abhi.skillloopai.entity.User;
import com.abhi.skillloopai.entity.VivaResult;
import com.abhi.skillloopai.exception.ResourceNotFoundException;
import com.abhi.skillloopai.repository.PdfQuestionRepository;
import com.abhi.skillloopai.repository.PdfStudySessionRepository;
import com.abhi.skillloopai.repository.UserRepository;
import com.abhi.skillloopai.repository.VivaResultRepository;

@Service
public class VivaService {

    private final VivaResultRepository repository;
    private final PdfQuestionRepository pdfQuestionRepository;
    private final PdfStudySessionRepository pdfStudySessionRepository;
    private final UserRepository userRepository;

    public VivaService(
            VivaResultRepository repository,
            PdfQuestionRepository pdfQuestionRepository,
            PdfStudySessionRepository pdfStudySessionRepository,
            UserRepository userRepository) {

        this.repository = repository;
        this.pdfQuestionRepository = pdfQuestionRepository;
        this.pdfStudySessionRepository = pdfStudySessionRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public List<VivaResult> getAllResults() {
        User user = getCurrentUser();
        return repository.findByUser(user);
    }

    public PdfVivaStartResponse startPdfViva(Long pdfId) {
        User user = getCurrentUser();

        pdfStudySessionRepository.findByIdAndUser(pdfId, user)
                .orElseThrow(() -> new ResourceNotFoundException("PDF not found"));

        return new PdfVivaStartResponse(pdfId, pdfQuestionRepository.findByPdfId(pdfId));
    }

    public VivaResult evaluate(VivaAnswerRequest request) {

        int score = request.getUserAnswer().length() > 20 ? 90 : 50;

        String feedback = score >= 80 ? "Good Answer" : "Need More Explanation";

        User user = getCurrentUser();

        VivaResult result = new VivaResult(
                request.getTopic(),
                request.getQuestion(),
                request.getUserAnswer(),
                score,
                feedback
        );

        result.setUser(user);

        return repository.save(result);
    }

    public PerformanceSummaryDTO getAnalytics() {

        User user = getCurrentUser();

        List<VivaResult> results = repository.findByUser(user);

        long totalAttempts = results.size();

        double averageScore = results.stream().mapToInt(VivaResult::getScore).average().orElse(0);

        int highestScore = results.stream().mapToInt(VivaResult::getScore).max().orElse(0);

        int lowestScore = results.stream().mapToInt(VivaResult::getScore).min().orElse(0);

        return new PerformanceSummaryDTO(totalAttempts, averageScore, highestScore, lowestScore);
    }
}