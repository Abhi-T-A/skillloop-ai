package com.abhi.skillloopai.dto;

import java.util.List;

public class PdfQuestionResponse {

    private Long pdfId;
    private List<QuestionAnswerDTO> questions;

    public PdfQuestionResponse(
            Long pdfId,
            List<QuestionAnswerDTO> questions) {

        this.pdfId = pdfId;
        this.questions = questions;
    }

    public Long getPdfId() {
        return pdfId;
    }

    public List<QuestionAnswerDTO> getQuestions() {
        return questions;
    }
}