package com.abhi.skillloopai.repository;

import com.abhi.skillloopai.entity.PdfQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PdfQuestionRepository
        extends JpaRepository<PdfQuestion, Long> {

    List<PdfQuestion> findByPdfId(Long pdfId);
}