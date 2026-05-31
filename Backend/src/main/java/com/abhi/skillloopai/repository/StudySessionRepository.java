package com.abhi.skillloopai.repository;

import java.util.List;
import com.abhi.skillloopai.entity.StudySession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudySessionRepository
        extends JpaRepository<StudySession, Long> {
}