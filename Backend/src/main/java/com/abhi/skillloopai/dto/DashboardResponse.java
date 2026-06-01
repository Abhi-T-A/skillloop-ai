package com.abhi.skillloopai.dto;

public class DashboardResponse {

    private long totalStudySessions;
    private long totalPdfUploads;
    private long totalVivaAttempts;
    private double averageScore;
    private int highestScore;
    private int lowestScore;

    public DashboardResponse(long totalStudySessions, long totalPdfUploads, long totalVivaAttempts,
                             double averageScore, int highestScore, int lowestScore) {
        this.totalStudySessions = totalStudySessions;
        this.totalPdfUploads = totalPdfUploads;
        this.totalVivaAttempts = totalVivaAttempts;
        this.averageScore = averageScore;
        this.highestScore = highestScore;
        this.lowestScore = lowestScore;
    }

    public long getTotalStudySessions() {
        return totalStudySessions;
    }

    public long getTotalPdfUploads() {
        return totalPdfUploads;
    }

    public long getTotalVivaAttempts() {
        return totalVivaAttempts;
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
