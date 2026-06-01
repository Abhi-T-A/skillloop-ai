package com.abhi.skillloopai.service;

import com.abhi.skillloopai.entity.PdfQuestion;
import com.abhi.skillloopai.entity.PdfStudySession;
import com.abhi.skillloopai.repository.PdfQuestionRepository;
import com.abhi.skillloopai.repository.PdfStudySessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionGenerationService {

    private final PdfStudySessionRepository pdfRepository;
    private final PdfQuestionRepository questionRepository;

    public QuestionGenerationService(
            PdfStudySessionRepository pdfRepository,
            PdfQuestionRepository questionRepository) {

        this.pdfRepository = pdfRepository;
        this.questionRepository = questionRepository;
    }
    public List<PdfQuestion> getQuestionsByPdf(Long pdfId) {

        return questionRepository.findByPdfId(pdfId);
    }

    public List<PdfQuestion> generateQuestions(Long pdfId) {

        PdfStudySession pdf =
                pdfRepository.findById(pdfId)
                        .orElseThrow();

        String content = pdf.getExtractedText();

        List<PdfQuestion> questions = List.of(

                new PdfQuestion(
                        pdfId,
                        "What is the main topic of this PDF?",
                        content.length() > 100
                                ? content.substring(0, 100)
                                : content
                ),

                new PdfQuestion(
                        pdfId,
                        "Explain an important concept discussed.",
                        "Generated from uploaded PDF."
                ),

                new PdfQuestion(
                        pdfId,
                        "What are the key takeaways?",
                        "Based on PDF content."
                )
        );

        return questionRepository.saveAll(questions);
    }
}