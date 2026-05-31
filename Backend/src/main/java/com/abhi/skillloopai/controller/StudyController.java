package com.abhi.skillloopai.controller;

import java.util.List;
import com.abhi.skillloopai.entity.StudySession;
import com.abhi.skillloopai.dto.TopicRequest;
import com.abhi.skillloopai.dto.StudyGuideResponse;
import com.abhi.skillloopai.service.StudyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/study")
public class StudyController {

    private final StudyService studyService;

    public StudyController(StudyService studyService) {
        this.studyService = studyService;
    }

    @PostMapping("/generate")
    public StudyGuideResponse generateQuestions(
            @RequestBody TopicRequest request) {

        return studyService.generateStudyContent(
                request.getTopic(),
                request.getDifficulty()
        );
    }
    @GetMapping("/history")
    public List<StudySession> getHistory() {
        return studyService.getStudyHistory();
    }
}