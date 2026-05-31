package com.abhi.skillloopai.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "viva_results")
public class VivaResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String topic;

    @Column(length = 1000)
    private String question;

    @Column(length = 3000)
    private String userAnswer;

    private Integer score;

    @Column(length = 1000)
    private String feedback;

    public VivaResult() {
    }

    public VivaResult(String topic,
                      String question,
                      String userAnswer,
                      Integer score,
                      String feedback) {
        this.topic = topic;
        this.question = question;
        this.userAnswer = userAnswer;
        this.score = score;
        this.feedback = feedback;
    }

    public Long getId() {
        return id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}