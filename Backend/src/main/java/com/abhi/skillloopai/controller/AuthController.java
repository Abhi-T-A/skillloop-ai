package com.abhi.skillloopai.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abhi.skillloopai.dto.AuthResponse;
import com.abhi.skillloopai.dto.LoginRequest;
import com.abhi.skillloopai.dto.RegisterRequest;
import com.abhi.skillloopai.service.AuthService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "Authentication APIs")
public class AuthController {

    private final AuthService authService;
    private final com.abhi.skillloopai.config.JwtService jwtService;

    public AuthController(AuthService authService, com.abhi.skillloopai.config.JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<com.abhi.skillloopai.dto.JwtAuthResponse> login(@Valid @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);

        String token = jwtService.generateToken(
                // reconstruct minimal User for token generation by email
                new com.abhi.skillloopai.entity.User(response.getName(), response.getEmail(), "", response.getRole())
        );

        com.abhi.skillloopai.dto.JwtAuthResponse jwtResponse = new com.abhi.skillloopai.dto.JwtAuthResponse(token, response);

        return ResponseEntity.ok(jwtResponse);
    }
}
