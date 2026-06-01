package com.abhi.skillloopai.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.abhi.skillloopai.dto.DashboardResponse;
import com.abhi.skillloopai.entity.User;
import com.abhi.skillloopai.entity.VivaResult;
import com.abhi.skillloopai.exception.ResourceNotFoundException;
import com.abhi.skillloopai.repository.PdfStudySessionRepository;
import com.abhi.skillloopai.repository.StudySessionRepository;
import com.abhi.skillloopai.repository.UserRepository;
import com.abhi.skillloopai.repository.VivaResultRepository;

@Service
public class DashboardService {

    private final StudySessionRepository studySessionRepository;
    private final PdfStudySessionRepository pdfStudySessionRepository;
    private final VivaResultRepository vivaResultRepository;
    private final UserRepository userRepository;

    public DashboardService(StudySessionRepository studySessionRepository,
                            PdfStudySessionRepository pdfStudySessionRepository,
                            VivaResultRepository vivaResultRepository,
                            UserRepository userRepository) {
        this.studySessionRepository = studySessionRepository;
        this.pdfStudySessionRepository = pdfStudySessionRepository;
        this.vivaResultRepository = vivaResultRepository;
        this.userRepository = userRepository;
    }

    public DashboardResponse getDashboardForCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        long totalStudySessions = studySessionRepository.findByUser(user).size();
        long totalPdfUploads = pdfStudySessionRepository.findByUser(user).size();

        List<VivaResult> vivaResults = vivaResultRepository.findByUser(user);
        long totalVivaAttempts = vivaResults.size();

        double averageScore = 0;
        int highestScore = 0;
        int lowestScore = 0;

        if (!vivaResults.isEmpty()) {
            int sum = 0;
            int max = Integer.MIN_VALUE;
            int min = Integer.MAX_VALUE;

            for (VivaResult r : vivaResults) {
                int s = r.getScore();
                sum += s;
                if (s > max) max = s;
                if (s < min) min = s;
            }

            averageScore = ((double) sum) / vivaResults.size();
            highestScore = max;
            lowestScore = min;
        }

        return new DashboardResponse(
                totalStudySessions,
                totalPdfUploads,
                totalVivaAttempts,
                averageScore,
                highestScore,
                lowestScore
        );
    }
}
