package com.abhi.skillloopai.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "pdf_study_sessions")
public class PdfStudySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    @Column(length = 10000)
    private String extractedText;

    public PdfStudySession() {
    }

    public PdfStudySession(String fileName, String extractedText) {
        this.fileName = fileName;
        this.extractedText = extractedText;
    }

    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public String getExtractedText() {
        return extractedText;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setExtractedText(String extractedText) {
        this.extractedText = extractedText;
    }
}