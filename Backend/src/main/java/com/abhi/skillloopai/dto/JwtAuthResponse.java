package com.abhi.skillloopai.dto;

public class JwtAuthResponse {

    private String token;
    private AuthResponse user;

    public JwtAuthResponse() {
    }

    public JwtAuthResponse(String token, AuthResponse user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public AuthResponse getUser() {
        return user;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setUser(AuthResponse user) {
        this.user = user;
    }
}
