package com.abhi.skillloopai.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abhi.skillloopai.entity.StudySession;

public interface StudySessionRepository
        extends JpaRepository<StudySession, Long> {

    java.util.List<StudySession> findByUser(com.abhi.skillloopai.entity.User user);

    java.util.Optional<StudySession> findByIdAndUser(Long id, com.abhi.skillloopai.entity.User user);
}