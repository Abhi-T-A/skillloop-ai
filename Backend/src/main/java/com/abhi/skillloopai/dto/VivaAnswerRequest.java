package com.abhi.skillloopai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class VivaAnswerRequest {

    @NotBlank(message = "Topic is required")
    private String topic;

    @NotBlank(message = "Question is required")
    private String question;

    @NotBlank(message = "Answer is required")
    @Size(min = 3, message = "Answer must be at least 3 characters")
    private String userAnswer;

    public String getTopic() {
        return topic;
    }

    public String getQuestion() {
        return question;
    }

    public String getUserAnswer() {
        return userAnswer;
    }
}