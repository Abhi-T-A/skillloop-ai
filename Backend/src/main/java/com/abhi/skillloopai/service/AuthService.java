package com.abhi.skillloopai.service;

import com.abhi.skillloopai.dto.AuthResponse;
import com.abhi.skillloopai.dto.LoginRequest;
import com.abhi.skillloopai.dto.RegisterRequest;
import com.abhi.skillloopai.entity.User;
import com.abhi.skillloopai.exception.ResourceNotFoundException;
import com.abhi.skillloopai.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        String hashed = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getName(),
                request.getEmail(),
                hashed,
                "USER"
        );

        User saved = userRepository.save(user);

        return new AuthResponse(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getRole(),
                saved.getCreatedAt()
        );
    }

    public AuthResponse login(LoginRequest request) {

        Optional<User> opt = userRepository.findByEmail(request.getEmail());

        if (opt.isEmpty()) {
            throw new ResourceNotFoundException("User not found with email: " + request.getEmail());
        }

        User user = opt.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt()
        );
    }
}
