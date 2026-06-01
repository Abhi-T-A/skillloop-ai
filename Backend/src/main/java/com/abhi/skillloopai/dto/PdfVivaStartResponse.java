package com.abhi.skillloopai.dto;

import com.abhi.skillloopai.entity.PdfQuestion;

import java.util.List;

public class PdfVivaStartResponse {

    private Long pdfId;
    private List<PdfQuestion> questions;

    public PdfVivaStartResponse(
            Long pdfId,
            List<PdfQuestion> questions) {

        this.pdfId = pdfId;
        this.questions = questions;
    }

    public Long getPdfId() {
        return pdfId;
    }

    public List<PdfQuestion> getQuestions() {
        return questions;
    }
}