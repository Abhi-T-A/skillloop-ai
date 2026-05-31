package com.abhi.skillloopai.dto;

public class PerformanceSummaryDTO {

    private long totalAttempts;
    private double averageScore;
    private int highestScore;
    private int lowestScore;

    public PerformanceSummaryDTO(
            long totalAttempts,
            double averageScore,
            int highestScore,
            int lowestScore) {

        this.totalAttempts = totalAttempts;
        this.averageScore = averageScore;
        this.highestScore = highestScore;
        this.lowestScore = lowestScore;
    }

    public long getTotalAttempts() {
        return totalAttempts;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public int getHighestScore() {
        return highestScore;
    }

    public int getLowestScore() {
        return lowestScore;
    }
}