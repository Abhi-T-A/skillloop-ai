package com.abhi.skillloopai.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.abhi.skillloopai.dto.QuestionAnswerDTO;
import com.abhi.skillloopai.dto.StudyGuideResponse;
import com.abhi.skillloopai.entity.StudySession;
import com.abhi.skillloopai.entity.User;
import com.abhi.skillloopai.exception.ResourceNotFoundException;
import com.abhi.skillloopai.repository.StudySessionRepository;
import com.abhi.skillloopai.repository.UserRepository;

@Service
public class StudyService {

        private final StudySessionRepository repository;
        private final UserRepository userRepository;

        public StudyService(StudySessionRepository repository, UserRepository userRepository) {
                this.repository = repository;
                this.userRepository = userRepository;
        }

        private User getCurrentUser() {
                String email = SecurityContextHolder.getContext().getAuthentication().getName();
                return userRepository.findByEmail(email)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        }

        public List<StudySession> getStudyHistory() {
                User user = getCurrentUser();
                return repository.findByUser(user);
        }

        public StudyGuideResponse generateStudyContent(
                        String topic,
                        String difficulty) {

                User user = getCurrentUser();

                StudySession session = new StudySession(topic, difficulty);
                session.setUser(user);

                repository.save(session);

                List<QuestionAnswerDTO> questions = List.of(
                                new QuestionAnswerDTO("What is Spring Boot?", "Spring Boot simplifies Spring development."),
                                new QuestionAnswerDTO("What is Dependency Injection?", "Dependency Injection reduces coupling."),
                                new QuestionAnswerDTO("What is REST API?", "REST API enables communication between systems.")
                );

                return new StudyGuideResponse(topic, difficulty, questions);
        }
}