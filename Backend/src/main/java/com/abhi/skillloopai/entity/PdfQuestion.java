package com.abhi.skillloopai.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "pdf_questions")
public class PdfQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long pdfId;

    @Column(length = 1000)
    private String question;

    @Column(length = 3000)
    private String answer;

    public PdfQuestion() {
    }

    public PdfQuestion(
            Long pdfId,
            String question,
            String answer) {

        this.pdfId = pdfId;
        this.question = question;
        this.answer = answer;
    }

    public Long getId() {
        return id;
    }

    public Long getPdfId() {
        return pdfId;
    }

    public void setPdfId(Long pdfId) {
        this.pdfId = pdfId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}