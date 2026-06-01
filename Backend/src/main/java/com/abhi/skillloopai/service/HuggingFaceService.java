package com.abhi.skillloopai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class HuggingFaceService {

    @Value("${huggingface.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public HuggingFaceService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateQuestions(String content) {

        String prompt = """
                Generate 5 viva questions and answers from:

                %s

                Format:

                Q1:
                A1:

                Q2:
                A2:
                """.formatted(content);

        String url =
                "https://api-inference.huggingface.co/models/google/flan-t5-large";

        HttpHeaders headers = new HttpHeaders();

        headers.setBearerAuth(apiKey);

        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "inputs",
                prompt
        );

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(
                        url,
                        entity,
                        String.class
                );

        return response.getBody();
    }
}