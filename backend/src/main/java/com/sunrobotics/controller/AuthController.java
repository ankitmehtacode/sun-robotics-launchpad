package com.sunrobotics.controller;

import com.sunrobotics.exception.InvalidCredentialsException;
import com.sunrobotics.model.User;
import com.sunrobotics.repository.UserRepository;
import com.sunrobotics.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        User user = userRepository.findByUsername(username).orElse(null);

        // Same generic failure for "no such user" and "wrong password" so the
        // response can't be used to enumerate valid usernames.
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        String token = jwtUtil.generateToken(username, user.getRole());
        return Map.of("token", token);
    }
}