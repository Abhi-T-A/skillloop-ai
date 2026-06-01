package com.abhi.skillloopai.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abhi.skillloopai.entity.PdfStudySession;

public interface PdfStudySessionRepository
        extends JpaRepository<PdfStudySession, Long> {

    java.util.List<PdfStudySession> findByUser(com.abhi.skillloopai.entity.User user);

    java.util.Optional<PdfStudySession> findByIdAndUser(Long id, com.abhi.skillloopai.entity.User user);
}