package com.abhi.skillloopai.service;

import java.io.IOException;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.abhi.skillloopai.dto.PdfQuestionResponse;
import com.abhi.skillloopai.dto.QuestionAnswerDTO;
import com.abhi.skillloopai.entity.PdfStudySession;
import com.abhi.skillloopai.entity.User;
import com.abhi.skillloopai.exception.ResourceNotFoundException;
import com.abhi.skillloopai.repository.PdfStudySessionRepository;
import com.abhi.skillloopai.repository.UserRepository;

@Service
public class PdfService {

        private final PdfStudySessionRepository repository;
        private final UserRepository userRepository;

        public PdfService(PdfStudySessionRepository repository, UserRepository userRepository) {
                this.repository = repository;
                this.userRepository = userRepository;
        }

        public List<PdfStudySession> getAllPdfs() {
                User user = getCurrentUser();
                return repository.findByUser(user);
        }

        public PdfStudySession getPdfById(Long pdfId) {
                User user = getCurrentUser();

                return repository.findByIdAndUser(pdfId, user)
                                .orElseThrow(() -> new ResourceNotFoundException("PDF not found"));
        }

    public PdfStudySession savePdf(
            MultipartFile file) throws IOException {

        return uploadPdf(file);
    }

    public PdfQuestionResponse generateQuestions(Long pdfId) {

        User user = getCurrentUser();

        repository.findByIdAndUser(pdfId, user)
                .orElseThrow(() -> new ResourceNotFoundException("PDF not found"));

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

        try (PDDocument document = PDDocument.load(file.getInputStream())) {

            PDFTextStripper stripper = new PDFTextStripper();

            String extractedText = stripper.getText(document);

            PdfStudySession session = new PdfStudySession(
                    file.getOriginalFilename(),
                    extractedText
            );

            session.setUser(getCurrentUser());

            return repository.save(session);
        }
    }

    private User getCurrentUser() {
        String email = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}