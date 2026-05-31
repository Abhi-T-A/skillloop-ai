package com.abhi.skillloopai.dto;

import java.util.List;

public class StudyGuideResponse {

    private String topic;
    private String difficulty;
    private List<QuestionAnswerDTO> questions;

    public StudyGuideResponse() {}

    public StudyGuideResponse(
            String topic,
            String difficulty,
            List<QuestionAnswerDTO> questions) {

        this.topic = topic;
        this.difficulty = difficulty;
        this.questions = questions;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public List<QuestionAnswerDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionAnswerDTO> questions) {
        this.questions = questions;
    }
}