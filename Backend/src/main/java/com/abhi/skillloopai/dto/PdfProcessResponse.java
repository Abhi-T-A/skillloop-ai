package com.abhi.skillloopai.dto;

import com.abhi.skillloopai.entity.PdfQuestion;

import java.util.List;

public class PdfProcessResponse {

    private Long pdfId;
    private String fileName;
    private List<PdfQuestion> questions;

    public PdfProcessResponse(
            Long pdfId,
            String fileName,
            List<PdfQuestion> questions) {

        this.pdfId = pdfId;
        this.fileName = fileName;
        this.questions = questions;
    }

    public Long getPdfId() {
        return pdfId;
    }

    public void setPdfId(Long pdfId) {
        this.pdfId = pdfId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public List<PdfQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<PdfQuestion> questions) {
        this.questions = questions;
    }
}