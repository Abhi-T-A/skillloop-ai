package com.abhi.skillloopai.repository;

import com.abhi.skillloopai.entity.PdfStudySession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PdfStudySessionRepository
        extends JpaRepository<PdfStudySession, Long> {
}