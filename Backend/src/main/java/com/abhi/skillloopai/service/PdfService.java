package com.abhi.skillloopai.service;

import java.util.List;

import com.abhi.skillloopai.dto.PdfQuestionResponse;
import com.abhi.skillloopai.dto.QuestionAnswerDTO;
import com.abhi.skillloopai.entity.PdfStudySession;
import com.abhi.skillloopai.repository.PdfStudySessionRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PdfService {

    private final PdfStudySessionRepository repository;

    public PdfService(PdfStudySessionRepository repository) {
        this.repository = repository;
    }

    public List<PdfStudySession> getAllPdfs() {
        return repository.findAll();
    }

    public PdfStudySession getPdfById(Long pdfId) {

        return repository.findById(pdfId)
                .orElseThrow();
    }

    public PdfStudySession savePdf(
            MultipartFile file) throws IOException {

        return uploadPdf(file);
    }

    public PdfQuestionResponse generateQuestions(Long pdfId) {

        PdfStudySession pdf =
                repository.findById(pdfId)
                        .orElseThrow();

        List<QuestionAnswerDTO> questions = List.of(

                new QuestionAnswerDTO(
                        "What is the main topic of this PDF?",
                        "Based on uploaded content."
                ),

                new QuestionAnswerDTO(
                        "Explain an important concept from the PDF.",
                        "Generated from extracted text."
                ),

                new QuestionAnswerDTO(
                        "What are the key takeaways?",
                        "Summary of PDF concepts."
                )
        );

        return new PdfQuestionResponse(
                pdfId,
                questions
        );
    }

    public PdfStudySession uploadPdf(
            MultipartFile file) throws IOException {

        PDDocument document =
                PDDocument.load(file.getInputStream());

        PDFTextStripper stripper =
                new PDFTextStripper();

        String extractedText =
                stripper.getText(document);

        document.close();

        PdfStudySession session =
                new PdfStudySession(
                        file.getOriginalFilename(),
                        extractedText
                );

        return repository.save(session);
    }
}