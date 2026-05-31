package com.abhi.skillloopai.service;

import java.util.List;
import com.abhi.skillloopai.dto.QuestionAnswerDTO;
import com.abhi.skillloopai.dto.StudyGuideResponse;
import com.abhi.skillloopai.entity.StudySession;
import com.abhi.skillloopai.repository.StudySessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudyService {

    private final StudySessionRepository repository;

    public StudyService(StudySessionRepository repository) {
        this.repository = repository;
    }

    public List<StudySession> getStudyHistory() {
        return repository.findAll();
    }

    public StudyGuideResponse generateStudyContent(
            String topic,
            String difficulty) {

        // Save session to PostgreSQL
        StudySession session =
                new StudySession(topic, difficulty);

        repository.save(session);

        List<QuestionAnswerDTO> questions = List.of(

                new QuestionAnswerDTO(
                        "What is Spring Boot?",
                        "Spring Boot simplifies Spring development."
                ),

                new QuestionAnswerDTO(
                        "What is Dependency Injection?",
                        "Dependency Injection reduces coupling."
                ),

                new QuestionAnswerDTO(
                        "What is REST API?",
                        "REST API enables communication between systems."
                )
        );

        return new StudyGuideResponse(
                topic,
                difficulty,
                questions
        );
    }
}