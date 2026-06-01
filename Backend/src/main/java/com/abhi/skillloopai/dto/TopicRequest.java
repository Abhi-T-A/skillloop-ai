package com.abhi.skillloopai.dto;

import jakarta.validation.constraints.NotBlank;

public class TopicRequest {

    @NotBlank(message = "Topic is required")
    private String topic;

    @NotBlank(message = "Difficulty is required")
    private String difficulty;

    public String getTopic() {
        return topic;
    }

    public String getDifficulty() {
        return difficulty;
    }

}